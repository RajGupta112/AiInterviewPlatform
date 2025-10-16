// app/root/interview/page.tsx
import Agent from '@/components/Agent';
import InterviewClient from '@/components/InterviewClient';
import { getCurrentUser } from '@/lib/actions/auth.action';
import React from 'react';

const InterviewPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6 text-center text-red-600">
        Please sign in to start your interview.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Interview Generation</h3>
      {/* ✅ pass server-fetched props down to client component */}
      <InterviewClient userName={user.name} userId={user.id} type="generate" />
    </div>
  );
};

export default InterviewPage;
