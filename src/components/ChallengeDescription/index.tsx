"use client";
import CustomSplit from "../Split";
import ChallengePrompt from "../ChallengePrompt";
import ChallengeDemo from "../ChallengeDemo";
import ChallengeSolution from "../ChallengeSolution";
import TabBar from "../TabBar";
import { useState } from "react";
import { ChallengeInterface } from "@/types/types";

const tabs = ["Prompt", "Solution"];

type Props = {
  challenge?: ChallengeInterface;
};
const ChallengeDescription = ({ challenge }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div style={{ height: "100vh" }}>
      <TabBar
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={(tab: string) => setCurrentTab(tab)}
      />
      <CustomSplit
        direction="vertical"
        sizes={[50, 50]}
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div style={{ overflow: "auto" }}>
          {currentTab === "Prompt" && <ChallengePrompt challenge={challenge} />}
          {currentTab === "Solution" && (
            <ChallengeSolution code={challenge?.solution} />
          )}
        </div>
        <ChallengeDemo challenge={challenge} />
      </CustomSplit>
    </div>
  );
};

export default ChallengeDescription;
