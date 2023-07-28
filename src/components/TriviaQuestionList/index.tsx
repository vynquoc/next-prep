"use client";
import styles from "./styles.module.css";
import icReact from "@/public/ic_react.svg";
import icHTML from "@/public/ic_html.svg";
import icJs from "@/public/ic_js.svg";
import icCss from "@/public/ic_css.svg";
import icSad from "@/public/ic_sad.svg";

import { TriviaQuestionInterface } from "@/types/types";
import TriviaQuestionItem from "../TriviaQuestionItem";
import Icon from "../Icon";
import SearchInput from "../SearchInput";
import { useEffect, useState } from "react";

type Props = {
  questionList: TriviaQuestionInterface[];
};

const tags = [
  { displayText: "HTML", value: "html", icon: icHTML },
  { displayText: "CSS", value: "css", icon: icCss },
  { displayText: "Javascript", value: "javascript", icon: icJs },
  { displayText: "React", value: "react", icon: icReact },
];

const TriviaQuestionList = ({ questionList }: Props) => {
  const [list, setList] = useState(questionList);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let filteredList = [...questionList];

    if (filteredTags.length !== 0) {
      filteredList = questionList.filter((question) => {
        return filteredTags.includes(question.category);
      });
    }

    if (searchInput.length) {
      filteredList = filteredList.filter((question) => {
        return question.title.toLowerCase().includes(searchInput.toLowerCase());
      });
    }

    setList(filteredList);
  }, [filteredTags, searchInput]);

  const handleTagClick = (value: string) => {
    let newValues = [...filteredTags];
    if (filteredTags.includes(value)) {
      newValues = newValues.filter((val) => val !== value);
    } else {
      newValues = [...newValues, value];
    }
    setFilteredTags(newValues);
  };

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <ul className={styles.tagsWrapper}>
          {tags.map((tag) => (
            <li
              key={tag.value}
              onClick={() => handleTagClick(tag.value)}
              className={
                filteredTags.includes(tag.value)
                  ? `${styles.tagItem} ${styles.tagActive}`
                  : styles.tagItem
              }
            >
              <Icon src={tag.icon} width={18} height={18} />
              <p>{tag.displayText}</p>
            </li>
          ))}
        </ul>
        <SearchInput onChange={handleInputChange} value={searchInput} />
      </div>

      <section className={styles.listContainer}>
        {list.length > 0 ? (
          <>
            {list.map((question) => (
              <TriviaQuestionItem key={question.id} question={question} />
            ))}
          </>
        ) : (
          <div className={styles.noQuestions}>
            <Icon src={icSad} width={50} height={50} />
            <p>No questions</p>
            <p>Try changing the filters</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TriviaQuestionList;
