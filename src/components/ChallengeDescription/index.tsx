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
    <div style={{ height: "100%" }}>
      <TabBar
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={(tab: string) => setCurrentTab(tab)}
      />
      <CustomSplit
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
        style={{ height: "100%", backgroundColor: "#1E1E1E" }}
      >
        <div style={{ overflow: "auto", width: "100%" }}>
          {currentTab === "Prompt" && <ChallengePrompt challenge={challenge} />}

          {currentTab === "Solution" && (
            <ChallengeSolution code={challenge?.solution} />
          )}
        </div>
        <div style={{ overflow: "auto", width: "100%" }}>
          <ChallengeDemo challenge={challenge} />
        </div>
      </CustomSplit>
    </div>
  );
};

export default ChallengeDescription;
