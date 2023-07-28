import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
  text: string;
};

const Tooltip = ({ children, text }: Props) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
};

export default Tooltip;
