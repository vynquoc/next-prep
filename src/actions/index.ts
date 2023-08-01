"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/admin/trivia-questions");
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
    const submission = await db.codingSubmission.create({
      data: {
        userId: user?.id,
        challengeId: challengeId,
      },
    });
    revalidatePath("/challenges");
    return submission;
  }
};

export const deleteCodingSubmission = async (challengeId: string) => {
  const user = await getCurrentUser();
  if (user) {
    const submission = await db.codingSubmission.findFirst({
      where: {
        challengeId: challengeId,
        userId: user.id,
      },
    });

    const deletedSubmission = await db.codingSubmission.delete({
      where: {
        id: submission?.id,
      },
    });

    revalidatePath("/challenges");
    if (deletedSubmission) return true;
    return false;
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
