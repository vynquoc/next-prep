"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import QuizResult from "@/components/QuizResult";
import ChoiceList from "@/components/ChoiceList";
import { QuizInterface } from "@/common/types";

const QuizPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answers, setAnwsers] = useState<any>({});
  const [done, setDone] = useState(false);

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
    return <QuizResult questionList={dummyData} chosenAnswers={answers} />;
  }

  const selectedQuestion = dummyData[selectedIndex];
  const progress = `${Object.keys(answers).length} / ${dummyData.length}`;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.questionListContainer}>
          <p>Progress {progress}</p>
          <ul>
            {dummyData.map((question, index) => (
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
            disabled={selectedIndex === dummyData.length - 1}
          >
            next
          </button>
        </div>
        <button
          onClick={() => setDone(true)}
          disabled={Object.keys(answers).length !== dummyData.length}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizPage;

const dummyData: QuizInterface[] = [
  {
    id: "rweeewr",
    title: "What is the output of this code 1 ?",
    prompt: `function logger() {
        console.log("output 1")
    }`,
    choices: ["output 1", "output 2", "output 3", "output 4"],
    correctAnswers: [0],
    kind: "single",
  },
  {
    id: "rweeewr33",
    title: "What is the output of this code 2 ?",
    prompt: `function logger() {
        console.log("output 2")
    }`,
    choices: ["output 1", "output 2", "output 3", "output 4"],
    correctAnswers: [1],
    kind: "single",
  },
  {
    id: "rweeewr333",
    title: "What is the output of this code 3 ?",
    prompt: `function logger() {
        console.log("output 3")
    }`,
    choices: ["output 1", "output 2", "output 3", "output 4"],
    correctAnswers: [2],
    kind: "single",
  },
  {
    id: "rweeewr555",
    title: "What is the output of this code 4 ?",
    prompt: `function logger() { 
        console.log("output 4")
    }`,
    choices: ["output 1", "output 2", "output 3", "output 4"],
    correctAnswers: [3],
    kind: "single",
  },
  {
    id: "rweeewr42434",
    title: "What is the output of this code 4 ?",
    prompt: `function logger() { 
        console.log("output 4")
    }`,
    choices: ["output 1", "output 2", "output 3", "output 4"],
    correctAnswers: [1, 2],
    kind: "multiple",
  },
];
