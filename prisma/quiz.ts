import { db } from "@/lib/db";
import { QuizInterface } from "@/types/types";

export const createQuiz = async ({
  title,
  prompt,
  choices,
  correctAnswers,
  kind,
  codeSnippet,
}: QuizInterface) => {
  const quiz = await db.quiz.create({
    data: {
      title,
      prompt,
      choices,
      correctAnswers,
      kind,
      codeSnippet,
    },
  });
  return quiz;
};

export const getAllQuizzes = async () => {
  const quizzes = await db.quiz.findMany();
  return quizzes;
};

export const getQuizById = async (id: string) => {
  const quiz = await db.quiz.findUnique({ where: { id: id } });
  return quiz;
};

export const updateQuiz = async (id: string, data: QuizInterface) => {
  const quiz = await db.quiz.update({
    where: {
      id: id,
    },
    data: data,
  });
  return quiz;
};
