import { QuizInterface } from "@/common/types";

type Props = {
  questionList: QuizInterface[];
  chosenAnswers: any;
};

const checkEqualAnswers = (arr1: number[], arr2: number[]) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[0])) return false;
  }
  return true;
};

const QuizResult = ({ questionList, chosenAnswers }: Props) => {
  const checkCorrectAnswers = () => {
    let count = 0;
    questionList.forEach((question, index) => {
      if (question.kind === "single") {
        if (question.correctAnswers[0] === chosenAnswers[index][0]) count++;
      } else {
        if (checkEqualAnswers(question.correctAnswers, chosenAnswers[index])) {
          count++;
        }
      }
    });
    return count;
  };
  return <div>{`${checkCorrectAnswers()} / ${questionList.length}`}</div>;
};

export default QuizResult;
