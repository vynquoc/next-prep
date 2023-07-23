"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import QuizResult from "@/components/QuizResult";
import ChoiceList from "@/components/ChoiceList";
import { QuizInterface } from "@/types/types";
import Editor from "../Editor";
import Icon from "../Icon";
import icLeft from "@/public/ic_arrow_left.svg";
import icRight from "@/public/ic_arrow_right.svg";
import useTimer from "@/hooks/useTimer";

type Props = {
  quizList: QuizInterface[];
  onDone: (data: any) => void;
};

const convertTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

const duration = 0.1; //minutes

const Quiz = ({ quizList, onDone }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answers, setAnwsers] = useState<{ [key: number]: number[] }>({});
  const { timeRemaining, start } = useTimer(duration);
  useEffect(() => {
    start();
  }, []);
  const handleSelectQuestion = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (timeRemaining >= 1) return;
    const timerId = setTimeout(() => {
      onDone({
        quizList: quizList,
        userAnswers: answers,
        timeDone: convertTime(duration * 60),
      });
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeRemaining]);

  const handleSelectAnswer = (questionIndex: number, answer: number[]) => {
    const updatedAnswers = { ...answers };
    if (answer.length === 0) {
      delete updatedAnswers[questionIndex];
    } else {
      updatedAnswers[questionIndex] = answer;
    }
    setAnwsers(updatedAnswers);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => prev - 1);
  };

  const handleDoneClick = () => {
    onDone({
      quizList: quizList,
      userAnswers: answers,
      timeDone: convertTime(duration * 60 - timeRemaining),
    });
  };

  const selectedQuestion = quizList[selectedIndex];
  const progress = `${Object.keys(answers).length} / ${quizList.length}`;
  const displayTime = convertTime(timeRemaining);
  return (
    <div className={styles.container}>
      <p>{displayTime}</p>
      <div className={styles.quizListContainer}>
        <p style={{ minWidth: 140 }}>Progress: {progress}</p>
        <ul className={styles.progressBar}>
          {quizList.map((question, index) => (
            <li
              className={
                selectedIndex === index || answers[index]
                  ? `${styles.questionItem} ${styles.selectedQuestion} `
                  : styles.questionItem
              }
              key={index}
              onClick={() => handleSelectQuestion(index)}
            >{`Question ${index + 1}`}</li>
          ))}
        </ul>
      </div>
      <section className={styles.questionContentContainer}>
        <div className={styles.questionContent}>
          <div className={styles.questionPrompt}>
            <p style={{ marginBottom: 10 }}>
              Question {selectedIndex + 1} / {quizList.length}
            </p>
            <h3 style={{ marginBottom: 10 }}>{selectedQuestion.title}</h3>
            {selectedQuestion.codeSnippet && (
              <Editor
                code={selectedQuestion.codeSnippet}
                editable={false}
                themeColor="light"
              />
            )}
          </div>
          <div className={styles.choicesContainer}>
            <ChoiceList
              choiceList={selectedQuestion.choices}
              onSelect={(value) => handleSelectAnswer(selectedIndex, value)}
              kind={selectedQuestion.kind}
              chosenAnswers={answers[selectedIndex]}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <button onClick={handlePrev} disabled={selectedIndex === 0}>
              <Icon src={icLeft} width={50} height={35} />
            </button>
            <button
              onClick={handleNext}
              disabled={selectedIndex === quizList.length - 1}
            >
              <Icon src={icRight} width={50} height={35} />
            </button>
          </div>
          <button
            className={styles.submitButton}
            onClick={handleDoneClick}
            // disabled={Object.keys(answers).length !== quizList.length}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
