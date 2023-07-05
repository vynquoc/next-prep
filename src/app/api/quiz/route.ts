import { NextResponse } from "next/server";
import { createQuiz, getAllQuizzes } from "../../../../prisma/quiz";

export async function GET() {
  const quizzes = await getAllQuizzes();
  return NextResponse.json(quizzes);
}
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const quiz = await createQuiz(json);
    return new NextResponse(JSON.stringify(quiz), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
