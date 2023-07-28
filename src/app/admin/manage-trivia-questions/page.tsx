import { getAllTriviaQuestions } from "@/actions";
import Link from "next/link";

const TriviaQuestionsManager = async () => {
  const questions = await getAllTriviaQuestions();
  return (
    <div>
      <Link className="button" href="/admin/create-question">
        Create Question
      </Link>
      <div>
        {questions.map((question) => (
          <div key={question.id}>
            <Link href={`/admin/edit-question/${question.id}`}>
              {question.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriviaQuestionsManager;
