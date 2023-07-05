import { PrismaClient } from "@prisma/client";
import { QuizInterface } from "@/common/types";
const prisma = new PrismaClient();

export const createQuiz = async ({
  title,
  prompt,
  choices,
  correctAnswer,
  kind,
}: QuizInterface) => {
  const quiz = await prisma.quiz.create({
    data: {
      title,
      prompt,
      choices,
      correctAnswer,
      kind,
    },
  });
  return quiz;
};

export const getAllQuizzes = async () => {
  const quizzes = await prisma.quiz.findMany();
  return quizzes;
};
