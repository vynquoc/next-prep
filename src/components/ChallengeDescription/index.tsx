"use client";
import Split from "react-split";
import ChallengePrompt from "../ChallengePrompt";
import ChallengeDemo from "../ChallengeDemo";
import TabBar from "../TabBar";
import { useState } from "react";

const tabs = ["PROMT", "SOLUTION"];
const ChallengeDescription = ({ challenge }: any) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div style={{ height: "100%" }}>
      <TabBar
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={(tab: string) => setCurrentTab(tab)}
      />
      <Split
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
        style={{ height: "100%", backgroundColor: "#1E1E1E" }}
      >
        <div style={{ overflow: "auto", width: "100%" }}>
          <ChallengePrompt challenge={challenge} />
        </div>
        <div style={{ overflow: "auto", width: "100%" }}>
          <ChallengeDemo />
        </div>
      </Split>
    </div>
  );
};

export default ChallengeDescription;
