import { getChallengeBySlug } from "@/prisma/challenge";
import CustomSplit from "@/components/Split";

import CodeWorkspace from "@/components/CodeWorkspace";
import ChallengeDescription from "@/components/ChallengeDescription";
import { ChallengeInterface, UserCodeInterface } from "@/types/types";
import { getUserCode } from "@/prisma/userCode";
import { getCurrentUser } from "@/lib/session";
import { Suspense } from "react";

const ChallengePage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const user = await getCurrentUser();
  const challenge = (await getChallengeBySlug(slug)) as ChallengeInterface;
  let userCode;

  if (user) {
    userCode = (await getUserCode(
      challenge?.slug as string,
      user.id
    )) as UserCodeInterface;
  }

  return (
    <div
      style={{
        padding: 15,
        backgroundColor: "var(--primary-color-dark)",
      }}
    >
      <CustomSplit sizes={[40, 60]} minSize={100} className="split">
        <ChallengeDescription challenge={challenge} />
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
