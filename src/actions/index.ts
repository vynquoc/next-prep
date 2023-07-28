"use server";

import { db } from "@/lib/db";

export const addTriviaQuestion = async (title: string, content: string) => {
  const question = await db.triviaQuestion.create({
    data: {
      title: title,
      content: content,
    },
  });
  console.log(question);
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
