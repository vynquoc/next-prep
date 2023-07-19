import { NextResponse } from "next/server";
import { createChallenge } from "@/prisma/challenge";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const challenge = await createChallenge(json);
    return new NextResponse(JSON.stringify(challenge), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
