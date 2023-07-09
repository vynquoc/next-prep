import { QuizInterface } from "@/types/types";

type Props = {
  questionList: QuizInterface[] | null;
  chosenAnswers: any;
};

const checkEqualAnswers = (array1: number[], array2: number[]) => {
  if (array1.length !== array2.length) {
    return false;
  }

  const frequencyMap = new Map();

  // Build frequency map for array1
  for (const element of array1) {
    frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
  }

  // Compare elements of array2 against frequency map
  for (const element of array2) {
    if (!frequencyMap.has(element)) {
      return false;
    }
    const frequency = frequencyMap.get(element);
    if (frequency === 1) {
      frequencyMap.delete(element);
    } else {
      frequencyMap.set(element, frequency - 1);
    }
  }

  return true;
};

const QuizResult = ({ questionList, chosenAnswers }: Props) => {
  const checkCorrectAnswers = () => {
    let count = 0;
    questionList?.forEach((question, index) => {
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
  return <div>{`${checkCorrectAnswers()} / ${questionList?.length}`}</div>;
};

export default QuizResult;
