import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const json = await request.json();
    const submission = await db.quizSubmission.create({
      data: {
        userId: user.id,
        quizList: json.quizList,
        userAnswers: json.userAnswers,
        finishTime: json.finishTime,
      },
    });
    return new NextResponse(JSON.stringify(submission), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const quizSubmission = await db.quizSubmission.findFirst({
      where: {
        userId: user.id,
      },
    });

    return new NextResponse(JSON.stringify(quizSubmission), {
      status: 200,
    });
  } catch (error) {}
}
