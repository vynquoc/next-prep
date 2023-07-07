import { signIn } from "@/prisma/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const user = await signIn(json.email);
    if (user && user.password === json.password) {
      const { password, ...userWithoutPassword } = user;
      return new Response(JSON.stringify(userWithoutPassword));
    } else {
      return new NextResponse(JSON.stringify(null));
    }
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
