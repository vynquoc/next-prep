import { db } from "@/lib/db";

export const createChallenge = async (data: any) => {
  const challenge = await db.challenge.create({ data: data });
  return challenge;
};

export const getChallengeBySlug = async (slug: string) => {
  const challenge = await db.challenge.findFirst({ where: { slug: slug } });
  return challenge;
};

export const updateChallenge = async (slug: string, data: any) => {
  const challenge = await db.challenge.update({
    where: { slug: slug },
    data: data,
  });
  return challenge;
};
