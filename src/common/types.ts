export type QuizForm = {
  title: string;
  prompt: string;
  kind: string;
  choices: string[];
  correctAnswer: number[];
};

export interface QuizInterface {
  title: string;
  prompt: string;
  kind: "multiple" | "single";
  choices: string[];
  correctAnswer: number[];
}
