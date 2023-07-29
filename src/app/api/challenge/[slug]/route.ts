import { getChallengeBySlug, updateChallenge } from "@/prisma/challenge";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const slug = request.url.split("/challenge/")[1];
    const challenge = await getChallengeBySlug(slug);
    return new NextResponse(JSON.stringify(challenge), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const slug = request.url.split("/challenge/")[1];
    const data = await request.json();

    const challenge = await updateChallenge(slug, data);
    return new NextResponse(JSON.stringify(challenge), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}
