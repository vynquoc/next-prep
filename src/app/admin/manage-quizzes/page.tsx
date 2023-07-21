import { getAllQuizzes } from "@/prisma/quiz";
import styles from "./styles.module.css";

import Link from "next/link";

const QuizManager = async () => {
  const quizzes = await getAllQuizzes();
  return (
    <div>
      <Link href="/admin/create-quiz">Create Quiz</Link>
      {quizzes.map((quiz) => (
        <Link href={`/admin/edit-quiz/${quiz.id}`} key={quiz.id}>
          {quiz.title}
        </Link>
      ))}
    </div>
  );
};

export default QuizManager;
