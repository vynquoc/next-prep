"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Split from "react-split";

import CodeWorkspace from "@/components/CodeWorkspace";
import ChallengeDescription from "@/components/ChallengeDescription";
import { useParams } from "next/navigation";

const ChallengePage = () => {
  const [challenge, setChallenge] = useState<any>(null);
  const searchParams = useParams();
  useEffect(() => {
    const fetchChallenge = async () => {
      const response = await fetch(`/api/challenge/${searchParams.slug}`);
      const data = await response.json();
      setChallenge(data);
    };
    fetchChallenge();
  }, []);
  return (
    <Split className="split" sizes={[40, 60]}>
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
    </Split>
  );
};

export default ChallengePage;
