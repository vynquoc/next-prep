"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import ChoiceList from "@/components/ChoiceList";
import { QuizInterface } from "@/types/types";
import Editor from "../Editor";
import Icon from "../Icon";
import icLeft from "@/public/ic_arrow_left.svg";
import icRight from "@/public/ic_arrow_right.svg";
import icClock from "@/public/ic_clock.svg";
import icCorrect from "@/public/ic_correct.svg";
import icInCorrect from "@/public/ic_incorrect.svg";
import { deepEqual } from "@/utils";

type Props = {
  quizList: QuizInterface[];
  userAnswers: any;
  timeDone: string;
};

const QuizReview = ({ quizList, userAnswers, timeDone }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const checkCorrect = (questionIndex: number, userAnswer: number[]) => {
    const question = quizList[questionIndex];
    if (userAnswer) {
      return deepEqual(question.correctAnswers, userAnswer);
    }
    return false;
  };

  const handleSelectQuestion = (index: number) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => prev - 1);
  };

  const selectedQuestion = quizList[selectedIndex];
  const progress = `${quizList.length} / ${quizList.length}`;

  return (
    <div className={styles.container}>
      <Icon src={icClock} style={{ fill: "blue" }} />
      <div className={styles.quizListContainer}>
        <p style={{ minWidth: 140 }}>Progress: {progress}</p>
        <ul className={styles.progressBar}>
          {quizList.map((question, index) => (
            <li
              className={`${styles.questionItem} ${styles.selectedQuestion}`}
              key={index}
              onClick={() => handleSelectQuestion(index)}
            >
              <span style={{ marginRight: 6 }}>Question {index + 1}</span>
              <span>
                {checkCorrect(index, userAnswers[index]) ? (
                  <Icon
                    src={icCorrect}
                    width={15}
                    height={15}
                    style={{ display: "inline" }}
                  />
                ) : (
                  <Icon
                    src={icInCorrect}
                    width={13}
                    height={13}
                    style={{ display: "inline" }}
                  />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <section className={styles.questionContentContainer}>
        <div className={styles.questionContent}>
          <div className={styles.questionPrompt}>
            <div
              style={{
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>
                Question {selectedIndex + 1} / {quizList.length}
              </p>
              <p>{timeDone}</p>
            </div>
            <h3 style={{ marginBottom: 10 }}>
              {checkCorrect(selectedIndex, userAnswers[selectedIndex]) ? (
                <Icon
                  src={icCorrect}
                  width={15}
                  height={15}
                  style={{ display: "inline" }}
                />
              ) : (
                <Icon
                  src={icInCorrect}
                  width={13}
                  height={13}
                  style={{ display: "inline" }}
                />
              )}{" "}
              {selectedQuestion.title}
            </h3>
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
              kind={selectedQuestion.kind}
              chosenAnswers={userAnswers[selectedIndex]}
              isReviewing={true}
              correctAnswers={selectedQuestion.correctAnswers}
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
        </div>
      </section>
    </div>
  );
};

export default QuizReview;
