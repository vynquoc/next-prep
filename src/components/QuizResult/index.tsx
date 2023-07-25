import styles from "./styles.module.css";
import { QuizInterface } from "@/types/types";
import { convertTime, deepEqual } from "@/utils";
type Props = {
  quizList: QuizInterface[] | null;
  userAnswers: any;
  finishTime: string;
  onReviewClick: () => void;
  onRetryClick: () => void;
};

const checkEqualAnswers = (array1: number[], array2: number[]) => {
  if (array1 && array2) {
    return deepEqual<number>(array1, array2);
  }
  return false;
};

const QuizResult = ({
  quizList,
  userAnswers,
  finishTime,
  onReviewClick,
  onRetryClick,
}: Props) => {
  const updatedQuizList = quizList;
  updatedQuizList?.forEach((quiz, index) => {
    if (!userAnswers[index]) {
      userAnswers[index] = null;
    }
  });
  const checkCorrectAnswers = () => {
    let count = 0;
    updatedQuizList?.forEach((question, index) => {
      if (question.kind === "single") {
        if (
          userAnswers[index] &&
          question.correctAnswers[0] === userAnswers[index][0]
        )
          count++;
      } else {
        if (checkEqualAnswers(question.correctAnswers, userAnswers[index])) {
          count++;
        }
      }
    });
    return count;
  };
  return (
    <div className={styles.container}>
      <h4>You&apos;ve completed the Frontend quiz.</h4>
      <div className={styles.result}>
        <p>
          <span>Time: </span>
          {convertTime(parseInt(finishTime))}
        </p>
        <p>
          <span>Score: </span>
          {`${checkCorrectAnswers()} / ${updatedQuizList?.length}`}
        </p>
      </div>
      <div className={styles.buttons}>
        <button onClick={onReviewClick}>Review Quiz</button>
        <button onClick={onRetryClick}>Retry Quiz</button>
      </div>
    </div>
  );
};

export default QuizResult;
