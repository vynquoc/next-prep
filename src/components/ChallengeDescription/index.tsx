"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import CustomSplit from "../Split";
import ChallengePrompt from "../ChallengePrompt";
import ChallengeDemo from "../ChallengeDemo";
import ChallengeSolution from "../ChallengeSolution";
import TabBar from "../TabBar";
import Tooltip from "../Tooltip";
import Icon from "../Icon";
import icCheck from "@/public/ic_check_green.svg";
import { ChallengeInterface } from "@/types/types";
import { addCodingSubmission } from "@/actions";

const tabs = ["Prompt", "Solution"];

type Props = {
  challenge: ChallengeInterface & {
    completed: boolean;
  };
};
const ChallengeDescription = ({ challenge }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleMark = async () => {
    await addCodingSubmission(challenge.id);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.header}>
        <TabBar
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={(tab: string) => setCurrentTab(tab)}
        />

        {!challenge.completed ? (
          <Tooltip text="Mark as completed">
            <div className={styles.checkbox} onClick={handleMark}></div>
          </Tooltip>
        ) : (
          <Tooltip text="Completed">
            <Icon
              src={icCheck}
              width={37}
              height={37}
              style={{ marginRight: 5 }}
            />
          </Tooltip>
        )}
      </div>
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
