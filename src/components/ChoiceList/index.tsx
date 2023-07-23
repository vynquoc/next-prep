import styles from "./styles.module.css";
type Props = {
  choiceList: string[];
  kind: string;
  chosenAnswers: number[];
  isReviewing?: boolean;
  correctAnswers?: number[];
  onSelect?: (answers: number[]) => void;
};

const ChoiceList = ({
  choiceList,
  kind,
  chosenAnswers = [],
  isReviewing = false,
  correctAnswers,
  onSelect,
}: Props) => {
  const handleMultipleSelect = (index: number) => {
    let updatedAnswers = [...chosenAnswers];
    if (chosenAnswers.includes(index)) {
      updatedAnswers = updatedAnswers.filter((answer) => answer !== index);
    } else {
      updatedAnswers = [...chosenAnswers, index];
    }
    onSelect && onSelect(updatedAnswers);
  };
  return (
    <div className={styles.container}>
      <ul>
        {choiceList.map((choice, index) => {
          let className = styles.choiceWrapper;
          if (isReviewing) {
            if (correctAnswers?.includes(index))
              className += ` ${styles.correctChoice}`;
          }
          return kind === "single" ? (
            <div key={index} className={className}>
              <input
                type="radio"
                name="choice"
                checked={chosenAnswers && chosenAnswers[0] === index}
                onClick={() => onSelect && onSelect([index])}
                disabled={isReviewing}
              />
              <label>{choice}</label>
            </div>
          ) : (
            <div key={index} className={className}>
              <input
                type="checkbox"
                checked={chosenAnswers && chosenAnswers.includes(index)}
                onChange={() => handleMultipleSelect(index)}
                disabled={isReviewing}
              />
              <label>{choice}</label>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ChoiceList;
