type Props = {
  type?: string;
  name?: string;
  title?: string;
  state: string;
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
    <div>
      {type !== "radio" && <label>{title}</label>}
      {isTextArea ? (
        <textarea
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
      {type === "radio" && <label>{title}</label>}
    </div>
  );
};

export default FormField;
