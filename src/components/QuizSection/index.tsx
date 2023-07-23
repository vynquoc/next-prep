"use client";
import { useState } from "react";
import { QuizInterface } from "@/types/types";
import Quiz from "../Quiz";
import QuizReview from "../QuizReview";
import QuizResult from "../QuizResult";

type Props = {
  quizList: QuizInterface[];
};
const QuizSection = ({ quizList }: Props) => {
  const [answersData, setAnwsersData] = useState<any>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleDone = (data: any) => {
    setAnwsersData(data);
    setIsDone(true);
  };

  if (isReviewing)
    return (
      <QuizReview
        quizList={answersData?.quizList}
        userAnswers={answersData?.userAnswers}
        timeDone={answersData.timeDone}
      />
    );

  if (isDone) {
    return (
      <QuizResult
        timeDone={answersData?.timeDone}
        quizList={answersData?.quizList}
        userAnswers={answersData?.userAnswers}
        onReviewClick={() => setIsReviewing(true)}
      />
    );
  }

  return (
    <div>
      <Quiz quizList={quizList} onDone={handleDone} />
    </div>
  );
};

export default QuizSection;
