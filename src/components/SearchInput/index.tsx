"use client";
import styles from "./styles.module.css";
import { useState } from "react";
import icSearch from "@/public/ic_search.svg";
import Icon from "../Icon";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const SearchInput = ({ onChange, value }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div
      className={
        isFocused
          ? `${styles.searchWrapper} ${styles.focused}`
          : styles.searchWrapper
      }
    >
      <Icon src={icSearch} width={20} height={20} />
      <input
        value={value}
        placeholder="Search questions"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
