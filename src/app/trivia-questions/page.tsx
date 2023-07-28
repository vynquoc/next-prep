import { getAllTriviaQuestions } from "@/actions";
import TriviaQuestionList from "@/components/TriviaQuestionList";

const TriviaQuestionsPage = async () => {
  const questionList = await getAllTriviaQuestions();
  return (
    <div style={{ fontFamily: "var(--primary-font)", padding: "30px" }}>
      <h1
        style={{ textAlign: "center", color: "white", margin: "30px 0 60px 0" }}
      >
        Trivia Interview Questions
      </h1>
      <TriviaQuestionList questionList={questionList} />
    </div>
  );
};

export default TriviaQuestionsPage;
