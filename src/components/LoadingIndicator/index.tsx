import styles from "./styles.module.css";
const LoadingIndicator = ({
  width,
  color = "white",
}: {
  width: number;
  color?: string;
}) => {
  return (
    <div
      style={{
        width: width,
        height: width,
        borderTopColor: color,
        borderBottomColor: color,
      }}
      className={styles.indicator}
    ></div>
  );
};

export default LoadingIndicator;
