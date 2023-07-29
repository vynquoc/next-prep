import ChallengeForm from "@/components/admin/ChallengeForm";
import { getChallengeBySlug } from "@/prisma/challenge";
import { ChallengeInterface } from "@/types/types";

const ChallengeUpdate = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const challenge = (await getChallengeBySlug(slug)) as ChallengeInterface;
  return (
    <ChallengeForm key={challenge?.id} challenge={challenge} mode="update" />
  );
};

export default ChallengeUpdate;
