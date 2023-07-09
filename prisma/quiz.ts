import { PrismaClient } from "@prisma/client";
import { QuizInterface } from "@/types/types";
const prisma = new PrismaClient();

export const createQuiz = async ({
  title,
  prompt,
  choices,
  correctAnswers,
  kind,
}: QuizInterface) => {
  const quiz = await prisma.quiz.create({
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
  const quizzes = await prisma.quiz.findMany();
  return quizzes;
};
