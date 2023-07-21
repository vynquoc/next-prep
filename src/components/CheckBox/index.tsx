import styles from "./styles.module.css";

type Props = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

const CheckBox = ({ label, checked, onChange }: Props) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label>{label}</label>
    </div>
  );
};

export default CheckBox;
