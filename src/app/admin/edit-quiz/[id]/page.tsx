import { getQuizById } from "@/prisma/quiz";
import styles from "./styles.module.css";
import QuizForm from "@/components/(admin)/QuizForm";
import { QuizInterface } from "@/types/types";
type Props = {
  params: {
    id: string;
  };
};
const EditQuiz = async ({ params: { id } }: Props) => {
  const quiz = (await getQuizById(id)) as QuizInterface;
  return <QuizForm quiz={quiz} mode="update" />;
};

export default EditQuiz;
