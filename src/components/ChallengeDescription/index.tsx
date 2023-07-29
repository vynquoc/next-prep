"use client";
import styles from "./styles.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { ChallengeInterface } from "@/types/types";
import { addCodingSubmission, deleteCodingSubmission } from "@/actions";

import CustomSplit from "../Split";
import ChallengePrompt from "../ChallengePrompt";
import ChallengeDemo from "../ChallengeDemo";
import ChallengeSolution from "../ChallengeSolution";
import TabBar from "../TabBar";
import Tooltip from "../Tooltip";
import Icon from "../Icon";

import icCheck from "@/public/ic_check_green.svg";

const tabs = ["Prompt", "Solution"];

type Props = {
  challenge: ChallengeInterface & {
    completed: boolean;
  };
};
const ChallengeDescription = ({ challenge }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [optimisticMark, setOptimisticMark] = useOptimistic(
    challenge.completed,
    (state, updatedMark: boolean) => updatedMark
  );
  const user = useSession();

  const handleMark = async () => {
    if (user) {
      setOptimisticMark(!optimisticMark);
      await addCodingSubmission(challenge.id);
    }
  };

  const handleUnmark = async () => {
    if (user) {
      setOptimisticMark(!optimisticMark);
      await deleteCodingSubmission(challenge.id);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.header}>
        <TabBar
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={(tab: string) => setCurrentTab(tab)}
        />

        {!optimisticMark ? (
          <Tooltip text="Mark as completed">
            <div className={styles.checkbox} onClick={handleMark}></div>
          </Tooltip>
        ) : (
          <Tooltip text="Completed">
            <div onClick={handleUnmark} style={{ cursor: "pointer" }}>
              <Icon
                src={icCheck}
                width={37}
                height={37}
                style={{ marginRight: 5 }}
              />
            </div>
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
