import { getAllTriviaQuestions } from "@/actions";
import Link from "next/link";

const TriviaQuestionsManager = async () => {
  const questions = await getAllTriviaQuestions();
  return (
    <div>
      <Link className="button" href="/admin/create-question">
        Create Question
      </Link>
      <section>
        {questions.map((question) => (
          <div key={question.id}>
            <Link href={`/admin/edit-question/${question.id}`}>
              {question.title}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TriviaQuestionsManager;
