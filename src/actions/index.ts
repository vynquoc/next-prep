"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const addTriviaQuestion = async (
  title: string,
  content: string,
  category: string
) => {
  await db.triviaQuestion.create({
    data: {
      title: title,
      content: content,
      category: category,
    },
  });
};

export const updateTriviaQuestion = async (
  id: string,
  data: { title?: string; content?: string }
) => {
  const question = await db.triviaQuestion.update({
    where: {
      id: id,
    },
    data: data,
  });
};

export const getTriviaQuestion = async (id: string) => {
  const question = await db.triviaQuestion.findUnique({
    where: {
      id: id,
    },
  });
  return question;
};

export const getAllTriviaQuestions = async () => {
  const questions = await db.triviaQuestion.findMany();
  return questions;
};

export const deleteTriviaQuestion = async (id: string) => {
  await db.triviaQuestion.delete({
    where: {
      id: id,
    },
  });
};

export const addCodingSubmission = async (challengeId: string) => {
  const user = await getCurrentUser();
  if (user) {
    await db.codingSubmission.create({
      data: {
        userId: user?.id,
        challengeId: challengeId,
      },
    });
  }
};

export const getCodingSubmission = async (challengeId: string) => {
  const user = await getCurrentUser();
  const submission = await db.codingSubmission.findFirst({
    where: {
      userId: user?.id,
      challengeId: challengeId,
    },
  });

  return submission;
};

export const getAllCodingSubmissions = async () => {
  const user = await getCurrentUser();
  const submissions = await db.codingSubmission.findMany({
    where: { userId: user?.id },
  });
  return submissions;
};
