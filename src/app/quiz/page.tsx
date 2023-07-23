import styles from "./styles.module.css";
import { getAllQuizzes } from "@/prisma/quiz";
import { QuizInterface } from "@/types/types";
import QuizSection from "@/components/QuizSection";

const QuizPage = async () => {
  const quizList = (await getAllQuizzes()) as QuizInterface[];
  return (
    <div className={styles.container}>
      <QuizSection quizList={quizList} />
    </div>
  );
};

export default QuizPage;
