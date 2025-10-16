
interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

interface InterviewCardProps{
  id: string;
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt: string;
}

interface SignUpParams{
  uid:string;
  name:string;
  email:string;
  password:string;
}

interface SignInParams{
  email:string;
  idToken:string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
}


interface TechIconProps {
  techStack: string[];
}


export enum TranscriptAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface TranscriptEntry {
  author: TranscriptAuthor;
  text: string;
  isFinal: boolean;
}
