import TriviaQuestionItem from "../TriviaQuestionItem";
import styles from "./styles.module.css";
import { TriviaQuestionInterface } from "@/types/types";

type Props = {
  questionList: TriviaQuestionInterface[];
};

const TriviaQuestionList = ({ questionList }: Props) => {
  return (
    <div>
      {questionList.map((question) => (
        <TriviaQuestionItem question={question} />
      ))}
    </div>
  );
};

export default TriviaQuestionList;
