"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import QuizResult from "@/components/QuizResult";
import ChoiceList from "@/components/ChoiceList";
import { QuizInterface } from "@/types/types";

const QuizPage = () => {
  const [questionList, setQuestionList] = useState<QuizInterface[] | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answers, setAnwsers] = useState<any>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await fetch("/api/quiz");
      const quizzes = await response.json();
      setQuestionList(quizzes);
    };
    getQuizzes();
  }, []);

  const handleSelectQuestion = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSelectAnswer = (questionIndex: number, answer: number[]) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[questionIndex] = answer;
    setAnwsers(updatedAnswers);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => prev - 1);
  };

  if (done) {
    return <QuizResult questionList={questionList} chosenAnswers={answers} />;
  }

  if (questionList == null) {
    return <div>Loading...</div>;
  }

  const selectedQuestion = questionList[selectedIndex];
  const progress = `${Object.keys(answers).length} / ${questionList.length}`;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.questionListContainer}>
          <p>Progress {progress}</p>
          <ul>
            {questionList.map((question, index) => (
              <li
                className={
                  selectedIndex === index ? styles.selectedQuestion : ""
                }
                key={index}
                onClick={() => handleSelectQuestion(index)}
              >{`Question ${index + 1}`}</li>
            ))}
          </ul>
        </div>
        <div className={styles.questionContent}>
          <h3>{selectedQuestion.title}</h3>
          <pre>{selectedQuestion.prompt}</pre>
          <div className={styles.choicesContainer}>
            <ChoiceList
              choiceList={selectedQuestion.choices}
              onSelect={(value) => handleSelectAnswer(selectedIndex, value)}
              kind={selectedQuestion.kind}
              chosenAnswers={answers[selectedIndex]}
            />
          </div>
          <button onClick={handlePrev} disabled={selectedIndex === 0}>
            prev
          </button>
          <button
            onClick={handleNext}
            disabled={selectedIndex === questionList.length - 1}
          >
            next
          </button>
        </div>
        <button
          onClick={() => setDone(true)}
          disabled={Object.keys(answers).length !== questionList.length}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
