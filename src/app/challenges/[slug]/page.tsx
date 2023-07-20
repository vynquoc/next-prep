import { getChallengeBySlug } from "@/prisma/challenge";
import CustomSplit from "@/components/Split";

import CodeWorkspace from "@/components/CodeWorkspace";
import ChallengeDescription from "@/components/ChallengeDescription";
import { ChallengeInterface } from "@/types/types";

const ChallengePage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const challenge = (await getChallengeBySlug(slug)) as ChallengeInterface;

  return (
    <CustomSplit className="split" sizes={[40, 60]}>
      <div style={{ height: "100vh" }}>
        <ChallengeDescription challenge={challenge} />
      </div>
      <div style={{ height: "100vh" }}>
        <CodeWorkspace
          key={challenge?.id}
          isReact={challenge?.languageToWrite === "jsx"}
          challenge={challenge}
        />
      </div>
    </CustomSplit>
  );
};

export default ChallengePage;
