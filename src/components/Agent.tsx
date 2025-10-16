'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface AgentProps {
  userName: string;
  userId?: string;
  type?: string;
}

interface SavedMessage {
  role: 'user' | 'assistant';
  content: string;
}

const Agent = ({ userName }: AgentProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const recognitionRef = useRef<any>(null);

  // --- SPEAK FUNCTION ---
  const speak = (text: string, onEnd?: () => void) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => {
        if (onEnd) onEnd();
      }, 100); // tiny delay to avoid race condition
    };
    speechSynthesis.speak(utter);
  };

  // --- LISTEN FUNCTION ---
  const startListening = async () => {
    setCallStatus(CallStatus.ACTIVE);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    // Request mic permission first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      alert('Please allow microphone access.');
      setCallStatus(CallStatus.FINISHED);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = async (event: any) => {
      const userText = event.results[0][0].transcript;
      setMessages((prev) => [...prev, { role: 'user', content: userText }]);
      console.log('User said:', userText);

      try {
        const res = await fetch('/api/interview/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userInput: userText,
            context: [...messages, { role: 'user', content: userText }]
              .map((m) => `${m.role}: ${m.content}`)
              .join('\n'),
          }),
        });

        const data = await res.json();
        const aiText = data.text || "Sorry, I didn't get that.";
        setMessages((prev) => [...prev, { role: 'assistant', content: aiText }]);

        // Speak AI response and continue listening after speech ends
        speak(aiText, () => startListening());
      } catch (err) {
        console.error('API error:', err);
        setCallStatus(CallStatus.FINISHED);
      }
    };

    recognition.onerror = (err: any) => {
      console.error('Recognition error:', err);
      setCallStatus(CallStatus.FINISHED);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.warn('Recognition start failed:', err);
    }
  };

  // --- STOP CALL ---
  const stopCall = () => {
    recognitionRef.current?.stop();
    setCallStatus(CallStatus.FINISHED);
    speechSynthesis.cancel();
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar relative">
            <Image
              src="/ai-avatar.png"
              alt="ai avatar"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="absolute animate-pulse w-3 h-3 bg-green-500 rounded-full right-0 bottom-0" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border mt-4 p-2 bg-gray-50 rounded-lg shadow-sm">
          <div className="transcript text-sm text-gray-700">
            {lastMessage?.role === 'assistant' && <p className="animate-fadeIn">{lastMessage.content}</p>}
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mt-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className="relative btn-call bg-blue-600 text-white px-6 py-2 rounded-md"
            onClick={() => {
              speak('Hello, what type of interview do you want?', () => startListening());
            }}
          >
            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'Start Interview' : '...'}
          </button>
        ) : (
          <button onClick={stopCall} className="btn-disconnect bg-red-500 text-white px-6 py-2 rounded-md">
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
