"use client";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { QuizInterface } from "@/types/types";
import Quiz from "../Quiz";
import QuizReview from "../QuizReview";
import QuizResult from "../QuizResult";
import { useSession } from "next-auth/react";

type Props = {
  quizList: QuizInterface[];
  userSubmission?: any;
};

const QuizSection = ({ quizList, userSubmission }: Props) => {
  const [answersData, setAnwsersData] = useState<any>({
    quizList: userSubmission?.quizList,
    finishTime: userSubmission?.finishTime,
    userAnswers: userSubmission?.userAnswers,
  });
  const [isReviewing, setIsReviewing] = useState(false);
  const [isDone, setIsDone] = useState(userSubmission ? true : false);
  const [started, setStarted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (answersData) {
      if (session) {
        handleQuizSubmission();
      }
    }
  }, [answersData]);

  const handleQuizSubmission = async () => {
    try {
      const response = await fetch("/api/quiz-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizList: answersData.quizList,
          finishTime: answersData.finishTime,
          userAnswers: answersData.userAnswers,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = (data: any) => {
    setAnwsersData(data);
    setIsDone(true);
  };

  const handleRetry = () => {
    setAnwsersData(null);
    setIsDone(false);
    setIsReviewing(false);
  };

  if (isReviewing)
    return (
      <QuizReview
        quizList={answersData.quizList}
        userAnswers={answersData.userAnswers}
        finishTime={answersData.finishTime}
      />
    );

  if (isDone) {
    return (
      <QuizResult
        finishTime={answersData?.finishTime}
        quizList={answersData?.quizList}
        userAnswers={answersData?.userAnswers}
        onReviewClick={() => setIsReviewing(true)}
        onRetryClick={handleRetry}
      />
    );
  }

  if (started) return <Quiz quizList={quizList} onFinish={handleFinish} />;

  return (
    <div className={styles.container}>
      <p>50 Questions</p>
      <p>Time: 45 minutes</p>
      <button onClick={() => setStarted(true)}>Start</button>
    </div>
  );
};

export default QuizSection;
