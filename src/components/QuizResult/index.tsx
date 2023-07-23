import { QuizInterface } from "@/types/types";
import { deepEqual } from "@/utils";
type Props = {
  quizList: QuizInterface[] | null;
  userAnswers: any;
  timeDone: string;
  onReviewClick: () => void;
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
  timeDone,
  onReviewClick,
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
    <div>
      <p>{timeDone}</p>
      <p>{`${checkCorrectAnswers()} / ${updatedQuizList?.length}`}</p>
      <button onClick={onReviewClick}>review</button>
    </div>
  );
};

export default QuizResult;
