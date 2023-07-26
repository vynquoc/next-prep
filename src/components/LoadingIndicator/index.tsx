import styles from "./styles.module.css";
const LoadingIndicator = ({ width }: { width: number }) => {
  return (
    <div
      style={{ width: width, height: width }}
      className={styles.indicator}
    ></div>
  );
};

export default LoadingIndicator;
