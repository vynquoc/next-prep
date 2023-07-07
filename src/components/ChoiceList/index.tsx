import styles from "./styles.module.css";
type Props = {
  choiceList: string[];
  kind: string;
  chosenAnswers: number[];
  onSelect: (answers: number[]) => void;
};

const ChoiceList = ({
  choiceList,
  kind,
  chosenAnswers = [],
  onSelect,
}: Props) => {
  const handleMultipleSelect = (index: number) => {
    let updatedAnswers = [...chosenAnswers];
    if (chosenAnswers.includes(index)) {
      updatedAnswers = updatedAnswers.filter((answer) => answer !== index);
    } else {
      updatedAnswers = [...chosenAnswers, index];
    }
    onSelect(updatedAnswers);
  };
  return (
    <div>
      <ul>
        {choiceList.map((choice, index) => {
          let className;
          if (chosenAnswers) {
            if (chosenAnswers.includes(index)) {
              className = styles.userAnswer;
            }
          }
          return kind === "single" ? (
            <li
              key={index}
              className={className}
              onClick={() => onSelect([index])}
            >
              {choice}
            </li>
          ) : (
            <li
              key={index}
              className={className}
              onClick={() => handleMultipleSelect(index)}
            >
              {choice}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChoiceList;
