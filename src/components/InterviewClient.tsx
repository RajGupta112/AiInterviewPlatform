"use client";

import Agent from "@/components/Agent";

interface Props {
  userName: string;
  userId: string;
}

const InterviewClient = ({ userName, userId }: Props) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Interview Generation</h3>
      <Agent userName={userName} userId={userId} type="generate" />
    </div>
  );
};

export default InterviewClient;
