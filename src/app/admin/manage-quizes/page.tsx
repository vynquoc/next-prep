import { User } from "@/components/user";
import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

const QuizManager = async () => {
  const session = await getServerSession(authConfig);
  const quizzes = await db.quiz.findMany();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      <h2>client</h2>
      <User />
      {quizzes.map((quiz) => (
        <p>{quiz.title}</p>
      ))}
    </div>
  );
};

export default QuizManager;
