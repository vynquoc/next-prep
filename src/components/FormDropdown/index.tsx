import styles from "./styles.module.css";
type Props = {
  label: string;

  options: {
    value: string;
    displayText: string;
  }[];
  onFieldChange: (value: string) => void;
  width?: string;
  state: string;
};

const FormDropdown = ({
  label,
  options,
  onFieldChange,
  width,
  state,
}: Props) => {
  return (
    <div className={styles.container} style={{ width: width }}>
      <label>{label}</label>
      <select
        name={label}
        value={state}
        onChange={(e) => onFieldChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.displayText}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormDropdown;
