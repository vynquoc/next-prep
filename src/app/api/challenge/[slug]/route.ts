import { getChallengeBySlug } from "@/prisma/challenge";
import { NextResponse } from "next/server";

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
