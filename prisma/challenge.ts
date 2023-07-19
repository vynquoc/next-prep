import { db } from "@/lib/db";

export const createChallenge = async (data: any) => {
  console.log(data);
  const challenge = await db.challenge.create({ data: data });
  return challenge;
};

export const getChallengeBySlug = async (slug: string) => {
  const challenge = await db.challenge.findFirst({ where: { slug: slug } });
  return challenge;
};
