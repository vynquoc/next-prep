"use client";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.css";
import { TriviaQuestionInterface } from "@/types/types";
import icReact from "@/public/ic_react.svg";
import icHTML from "@/public/ic_html.svg";
import icJs from "@/public/ic_js.svg";
import icCss from "@/public/ic_css.svg";
import { useRef, useState } from "react";
import Icon from "../Icon";

type Props = {
  question: TriviaQuestionInterface;
};

const icons = {
  html: icHTML,
  css: icCss,
  javascript: icJs,
  react: icReact,
};

const TriviaQuestionItem = ({ question }: Props) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={
        open ? `${styles.questionItem} ${styles.itemOpen}` : styles.questionItem
      }
    >
      <div className={styles.itemHeader} onClick={() => setOpen(!open)}>
        <Icon
          className={styles.itemIcon}
          src={icons[question.category as keyof typeof icons]}
          width={20}
          height={20}
        />
        <h4>{question.title}</h4>
      </div>
      <div
        ref={contentRef}
        className={
          open
            ? `${styles.itemContent} ${styles.contentOpen}`
            : styles.itemContent
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
