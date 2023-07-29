import { getAllQuizzes } from "@/prisma/quiz";
import styles from "./styles.module.css";

import Link from "next/link";

const QuizManager = async () => {
  const quizzes = await getAllQuizzes();
  return (
    <div>
      <Link href="/admin/create-quiz" className="button">
        Create Quiz
      </Link>
      <section>
        {quizzes.map((quiz) => (
          <div>
            <Link href={`/admin/edit-quiz/${quiz.id}`} key={quiz.id}>
              {quiz.title}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default QuizManager;
