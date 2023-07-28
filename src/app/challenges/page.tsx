import { db } from "@/lib/db";
import styles from "./styles.module.css";
import ChallengeList from "@/components/ChallengeList";
import { ChallengeInterface } from "@/types/types";
import { getAllCodingSubmissions } from "@/actions";
import { getCurrentUser } from "@/lib/session";

const CodingChallenges = async () => {
  let challengeList;
  const user = await getCurrentUser();
  const challenges = (await db.challenge.findMany()) as ChallengeInterface[];
  if (user) {
    const submissions = await getAllCodingSubmissions();
    const combinedChallenges = () => {
      const lookup = submissions.reduce((acc: any, item) => {
        acc[item.challengeId] = item.challengeId;
        return acc;
      }, {});

      return challenges.map((challenge) => ({
        ...challenge,
        completed: lookup[challenge.id] ? true : false,
      }));
    };
    challengeList = combinedChallenges();
  } else {
    challengeList = challenges;
  }

  return (
    <div className={styles.container}>
      <h1>Coding challenges</h1>
      <ChallengeList challengeList={challengeList} />
    </div>
  );
};

export default CodingChallenges;
