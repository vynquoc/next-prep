import { getChallengeBySlug } from "@/prisma/challenge";
import CustomSplit from "@/components/Split";

import CodeWorkspace from "@/components/CodeWorkspace";
import ChallengeDescription from "@/components/ChallengeDescription";
import { ChallengeInterface, UserCodeInterface } from "@/types/types";
import { getUserCode } from "@/prisma/userCode";
import { getCurrentUser } from "@/lib/session";
import { getCodingSubmission } from "@/actions";

const ChallengePage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const user = await getCurrentUser();
  const challenge = (await getChallengeBySlug(slug)) as ChallengeInterface & {
    completed: boolean;
  };
  let combinedChallenge = challenge;
  let userCode;
  if (user) {
    const submission = await getCodingSubmission(challenge.id);
    userCode = (await getUserCode(
      challenge?.slug as string,
      user.id
    )) as UserCodeInterface;
    if (submission) {
      combinedChallenge = { ...challenge, completed: true };
    }
  }

  return (
    <div
      style={{
        padding: 15,
        backgroundColor: "var(--primary-color-dark)",
      }}
    >
      <CustomSplit sizes={[40, 60]} minSize={100} className="split">
        <ChallengeDescription challenge={combinedChallenge} />
        <CodeWorkspace
          user={user}
          key={challenge?.id}
          isReact={challenge?.languageToWrite === "jsx"}
          challenge={challenge}
          userCode={userCode}
        />
      </CustomSplit>
    </div>
  );
};

export default ChallengePage;
