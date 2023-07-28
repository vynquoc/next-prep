"use client";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";
import { TriviaQuestionInterface } from "@/types/types";
import { useRef, useState } from "react";

type Props = {
  question: TriviaQuestionInterface;
};

const TriviaQuestionItem = ({ question }: Props) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.questionItem}>
      <div className={styles.itemHeader} onClick={() => setOpen(!open)}>
        <h4>{question.title}</h4>
      </div>
      <div
        ref={contentRef}
        className={
          open ? `${styles.itemContent} ${styles.open}` : styles.itemContent
        }
        style={
          open
            ? { height: contentRef?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <ReactMarkdown className="markdown">{question.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TriviaQuestionItem;
