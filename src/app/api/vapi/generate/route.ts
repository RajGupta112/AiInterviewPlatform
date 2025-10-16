import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { transcript } = await req.json();

  // Convert transcript array to readable format
  const transcriptText = transcript
    .map((entry: any) => `${entry.author === 'USER' ? 'Candidate' : 'AI'}: ${entry.text}`)
    .join('\n');

  const prompt = `
    You are an expert career coach specializing in interview preparation.
    Analyze the following interview transcript and provide constructive, actionable feedback for the candidate.

    ### Overall Summary
    A brief overview of the candidate's performance.

    ### Strengths
    - Specific things the candidate did well.
    - Strong communication, good examples.

    ### Areas for Improvement
    - Specific areas to improve with tips.
    - Identify weak points or unclear answers.

    ### Actionable Next Steps
    - A short list of practical steps to improve.

    Transcript:
    ---
    ${transcriptText}
    ---
  `;

  try {
    const { text: feedback } = await generateText({
      model: google("gemini-2.0-pro-exp-02-05"),
      prompt,
    });

    return Response.json({ success: true, feedback });
  } catch (error) {
    console.error("Error generating feedback:", error);
    return Response.json({ success: false, error: "Failed to generate feedback" }, { status: 500 });
  }
}
