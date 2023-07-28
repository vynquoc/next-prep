import { getAllTriviaQuestions } from "@/actions";
import TriviaQuestionList from "@/components/TriviaQuestionList";
import { TriviaQuestionInterface } from "@/types/types";

const TriviaQuestionsPage = async () => {
  const questionList =
    (await getAllTriviaQuestions()) as TriviaQuestionInterface[];
  return (
    <div
      style={{
        fontFamily: "var(--primary-font)",
        padding: "30px 0",
        height: "100vh",
        backgroundColor: "var(--primary-bg)",
      }}
    >
      <h1
        style={{ textAlign: "center", color: "white", margin: "30px 0 30px 0" }}
      >
        Trivia Interview Questions
      </h1>
      <TriviaQuestionList questionList={questionList} />
    </div>
  );
};

export default TriviaQuestionsPage;
