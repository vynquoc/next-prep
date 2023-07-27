import styles from "./styles.module.css";
import ChallengeItem from "../ChallengeItem";
import { ChallengeInterface } from "@/types/types";

type Props = {
  challengeList: ChallengeInterface[];
};

const ChallengeList = ({ challengeList }: Props) => {
  return (
    <div className={styles.challengeList}>
      {challengeList.map((challenge) => (
        <ChallengeItem key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default ChallengeList;
