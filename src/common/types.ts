export type QuizForm = {
  title: string;
  prompt: string;
  kind: string;
  choices: string[];
  correctAnswers: number[];
};

export interface QuizInterface {
  id?: string;
  title: string;
  prompt: string;
  kind: "multiple" | "single";
  choices: string[];
  correctAnswers: number[];
}

export interface UserInterface {
  name: string;
  email: string;
  role: string;
}
