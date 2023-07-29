"use client";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { ChallengeInterface } from "@/types/types";
import ChallengeItem from "../ChallengeItem";
import Icon from "../Icon";
import Filter from "../Filter";

import icJs from "@/public/ic_js.svg";
import icInterface from "@/public/ic_interface.svg";
import icSad from "@/public/ic_sad.svg";

type Props = {
  challengeList: ChallengeInterface[];
};

const tagsOption = [
  {
    icon: icJs,
    text: "Javascript Utilities",
    value: "Javascript Utilities",
  },
  {
    icon: icInterface,
    text: "User Interface",
    value: "User Interface",
  },
];

const ChallengeList = ({ challengeList }: Props) => {
  const [list, setList] = useState(challengeList);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let filteredList = [...challengeList];
    if (filteredTags.length) {
      filteredList = challengeList.filter((item) =>
        filteredTags.includes(item?.type)
      );
    }
    if (searchInput.length) {
      filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setList(filteredList);
  }, [searchInput, filteredTags]);

  const handleTagClick = (value: string) => {
    let newValue = [...filteredTags];
    if (filteredTags.includes(value)) {
      newValue = filteredTags.filter((tag) => tag !== value);
    } else {
      newValue = [...filteredTags, value];
    }

    setFilteredTags(newValue);
  };

  return (
    <div className={styles.container}>
      <Filter
        tagsOption={tagsOption}
        activeTags={filteredTags}
        searchValue={searchInput}
        numOfItems={list.length}
        onTagClick={(value: string) => handleTagClick(value)}
        onInputChange={(value: string) => setSearchInput(value)}
      />
      {list.length > 0 ? (
        <section className={styles.challengeList}>
          {list.map((challenge) => (
            <ChallengeItem key={challenge.id} challenge={challenge} />
          ))}
        </section>
      ) : (
        <div className={styles.noQuestions}>
          <Icon src={icSad} width={50} height={50} />
          <p>No questions</p>
          <p>Try changing the filters</p>
        </div>
      )}
    </div>
  );
};

export default ChallengeList;
