import styles from "./styles.module.css";

type Props = {
  type?: string;
  name?: string;
  title?: string;
  state?: string;
  placeholder?: string;
  isTextArea?: boolean;
  width?: string;
  checked?: boolean;
  style?: React.CSSProperties;
  textAreaHeight?: string;
  onFieldChange: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  width,
  checked,
  style,
  textAreaHeight,
  onFieldChange,
}: Props) => {
  return (
    <div className={styles.fieldWrapper} style={{ width: width, ...style }}>
      {type !== "radio" && <label className={styles.fieldLabel}>{title}</label>}
      {isTextArea ? (
        <textarea
          className={styles.textArea}
          style={{ height: textAreaHeight }}
          placeholder={placeholder}
          value={state}
          onChange={(e) => onFieldChange(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          checked={checked}
          onChange={(e) => onFieldChange(e.target.value)}
        />
      )}
      {type === "radio" && <label className={styles.fieldLabel}>{title}</label>}
    </div>
  );
};

export default FormField;
