import { db } from "@/lib/db";
import styles from "./styles.module.css";
import ChallengeList from "@/components/ChallengeList";
import { ChallengeInterface } from "@/types/types";

const CodingChallenges = async () => {
  const challenges = (await db.challenge.findMany()) as ChallengeInterface[];

  return (
    <div className={styles.container}>
      <h1>Coding challenges</h1>
      <ChallengeList challengeList={challenges} />
    </div>
  );
};

export default CodingChallenges;
