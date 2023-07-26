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
    <Suspense fallback={<h1>Loading...</h1>}>
      <CustomSplit className="split" sizes={[40, 60]}>
        <div style={{ height: "100vh" }}>
          <ChallengeDescription challenge={challenge} />
        </div>
        <div style={{ height: "100vh" }}>
          <CodeWorkspace
            key={challenge?.id}
            isReact={challenge?.languageToWrite === "jsx"}
            challenge={challenge}
            userCode={userCode}
          />
        </div>
      </CustomSplit>
    </Suspense>
  );
};

export default ChallengePage;
