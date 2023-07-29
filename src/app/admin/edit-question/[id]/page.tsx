import { getTriviaQuestion } from "@/actions";
import QuestionForm from "@/components/admin/QuestionForm";
import { TriviaQuestionInterface } from "@/types/types";

const EditQuestion = async ({ params: { id } }: { params: { id: string } }) => {
  const question = (await getTriviaQuestion(id)) as TriviaQuestionInterface;
  return <QuestionForm mode="update" question={question} />;
};

export default EditQuestion;
