import styles from "./styles.module.css";
import Icon from "../Icon";
import SearchInput from "../SearchInput";
import Tooltip from "../Tooltip";

import icBook from "@/public/ic_book.svg";

type Props = {
  tagsOption: {
    icon: SVGElement;
    text: string;
    value: string;
  }[];
  onTagClick: (value: string) => void;
  activeTags: string[];
  searchValue: string;
  onInputChange: (value: string) => void;
  numOfItems: number;
};

const Filter = ({
  tagsOption,
  activeTags,
  searchValue,
  onTagClick,
  onInputChange,
  numOfItems,
}: Props) => {
  return (
    <div className={styles.filterWrapper}>
      <ul className={styles.tagsWrapper}>
        {tagsOption.map((tag) => (
          <li
            key={tag.text}
            onClick={() => onTagClick(tag.value)}
            className={
              activeTags.includes(tag.value)
                ? `${styles.tagItem} ${styles.tagActive}`
                : styles.tagItem
            }
          >
            <Icon src={tag.icon} width={18} height={18} />
            <p>{tag.text}</p>
          </li>
        ))}
      </ul>
      <SearchInput onChange={onInputChange} value={searchValue} />
      <Tooltip text="Number of Questions">
        <div className={styles.numOfItems}>
          <Icon src={icBook} width={18} height={18} />
          <span>{numOfItems} questions</span>
        </div>
      </Tooltip>
    </div>
  );
};

export default Filter;
