import { User } from "next-auth";
export type QuizForm = {
  title: string;
  prompt: string;
  kind: string;
  choices: string[];
  correctAnswers: number[];
  codeSnippet: string;
};

export interface QuizInterface {
  id?: string;
  title: string;
  prompt: string;
  codeSnippet?: string;
  kind: "multiple" | "single";
  choices: string[];
  correctAnswers: number[];
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export interface ChallengeInterface {
  id: string;
  name: string;
  prompt: string;
  category: string;
  type: string;
  slug?: string;
  hints?: string[];
  languageToWrite?: string;
  promptCode?: {
    css?: string;
    html?: string;
    js?: string;
  };
  reactConfig?: {
    componentName?: string;
  };
  solution?: string;
  difficulty?: string;
  tags?: string[];
  shortDescription?: string;
  createdAt?: Date;
}

export interface UserCodeInterface {
  id: string;
  code: string;
  challenge: string;
  userId: string;
}

export interface TriviaQuestionInterface {
  id: string;
  content: string;
  title: string;
  category: string;
}
