
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



interface TechIconProps {
  techStack: string[];
}