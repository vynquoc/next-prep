import { db } from "@/lib/db";
import { QuizInterface } from "@/types/types";

export const createQuiz = async ({
  title,
  prompt,
  choices,
  correctAnswers,
  kind,
}: QuizInterface) => {
  const quiz = await db.quiz.create({
    data: {
      title,
      prompt,
      choices,
      correctAnswers,
      kind,
    },
  });
  return quiz;
};

export const getAllQuizzes = async () => {
  const quizzes = await db.quiz.findMany();
  return quizzes;
};
