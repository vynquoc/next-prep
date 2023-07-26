import { db } from "@/lib/db";
import { ChallengeInterface } from "@/types/types";

export const createChallenge = async (data: ChallengeInterface) => {
  const challenge = await db.challenge.create({ data: data });
  return challenge;
};

export const getChallengeBySlug = async (slug: string) => {
  const challenge = await db.challenge.findUnique({ where: { slug: slug } });
  return challenge;
};

export const updateChallenge = async (
  slug: string,
  data: ChallengeInterface
) => {
  const challenge = await db.challenge.update({
    where: { slug: slug },
    data: data,
  });
  return challenge;
};
