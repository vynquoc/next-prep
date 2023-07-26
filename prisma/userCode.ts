import { db } from "@/lib/db";

export async function getUserCode(challenge: string, userId: string) {
  const userCode = await db.userCode.findFirst({
    where: {
      challenge,
      userId,
    },
  });
  return userCode;
}
