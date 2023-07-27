import styles from "./styles.module.css";
import { getAllQuizzes } from "@/prisma/quiz";
import { QuizInterface } from "@/types/types";
import QuizSection from "@/components/QuizSection";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const QuizPage = async () => {
  const user = await getCurrentUser();
  const quizList = (await getAllQuizzes()) as QuizInterface[];
  let submissons = null;
  if (user) {
    submissons = await db.quizSubmission.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>Frontend Quiz</h1>
        <p>The best way to assess your frontend knowledge</p>
      </div>
      <section className={styles.mainSection}>
        <QuizSection
          quizList={quizList}
          userSubmission={submissons && submissons[0]}
        />
      </section>
    </div>
  );
};

export default QuizPage;
