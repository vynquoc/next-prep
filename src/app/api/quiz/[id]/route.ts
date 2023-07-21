import { updateQuiz } from "@/prisma/quiz";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const id = request.url.split("/quiz/")[1];
    const data = await request.json();
    const quiz = await updateQuiz(id, data);
    return new NextResponse(JSON.stringify(quiz), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}
