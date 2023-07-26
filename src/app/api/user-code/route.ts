import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const { user } = session;
    const json = await request.json();
    const userCode = await db.userCode.findFirst({
      where: {
        userId: user.id,
        challenge: json.challenge,
      },
    });
    return new NextResponse(JSON.stringify(userCode), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const json = await request.json();
    const userCode = await db.userCode.create({
      data: {
        userId: user.id,
        challenge: json.challenge,
        code: json.code,
      },
    });

    return new NextResponse(JSON.stringify(userCode), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const json = await request.json();
    const userCode = await db.userCode.update({
      where: {
        id: json.id,
      },
      data: {
        code: json.code,
      },
    });
    return new NextResponse(JSON.stringify(userCode), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
