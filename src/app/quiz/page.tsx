import styles from "./styles.module.css";
import { getAllQuizzes } from "@/prisma/quiz";
import { QuizInterface } from "@/types/types";
import QuizSection from "@/components/QuizSection";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

const QuizPage = async () => {
  const session = await getServerSession();
  const quizList = (await getAllQuizzes()) as QuizInterface[];
  let submissons = null;
  if (session) {
    submissons = await db.quizSubmission.findMany({
      where: { userId: session.user.id },
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
