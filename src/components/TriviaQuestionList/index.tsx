"use client";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { TriviaQuestionInterface } from "@/types/types";

import icReact from "@/public/ic_react.svg";
import icHTML from "@/public/ic_html.svg";
import icJs from "@/public/ic_js.svg";
import icCss from "@/public/ic_css.svg";
import icSad from "@/public/ic_sad.svg";

import TriviaQuestionItem from "../TriviaQuestionItem";
import Icon from "../Icon";
import Filter from "../Filter";

type Props = {
  questionList: TriviaQuestionInterface[];
};

const tags = [
  { text: "HTML", value: "html", icon: icHTML },
  { text: "CSS", value: "css", icon: icCss },
  { text: "Javascript", value: "javascript", icon: icJs },
  { text: "React", value: "react", icon: icReact },
];

const TriviaQuestionList = ({ questionList }: Props) => {
  const [list, setList] = useState<TriviaQuestionInterface[]>(questionList);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

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
      newValues = filteredTags.filter((val) => val !== value);
    } else {
      newValues = [...filteredTags, value];
    }

    setFilteredTags(newValues);
  };

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  return (
    <div className={styles.container}>
      <Filter
        tagsOption={tags}
        activeTags={filteredTags}
        searchValue={searchInput}
        numOfItems={list.length}
        onTagClick={(value: string) => handleTagClick(value)}
        onInputChange={(value: string) => handleInputChange(value)}
      />

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
