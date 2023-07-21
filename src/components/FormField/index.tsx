import styles from "./styles.module.css";

type Props = {
  type?: string;
  name?: string;
  title?: string;
  state?: string;
  placeholder?: string;
  isTextArea?: boolean;
  onFieldChange: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  onFieldChange,
}: Props) => {
  return (
    <div className={styles.fieldWrapper}>
      {type !== "radio" && <label className={styles.fieldLabel}>{title}</label>}
      {isTextArea ? (
        <textarea
          className={styles.textArea}
          placeholder={placeholder}
          value={state}
          onChange={(e) => onFieldChange(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          required
          value={state}
          onChange={(e) => onFieldChange(e.target.value)}
        />
      )}
      {type === "radio" && <label className={styles.fieldLabel}>{title}</label>}
    </div>
  );
};

export default FormField;
