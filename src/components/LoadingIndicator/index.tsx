import styles from "./styles.module.css";
const LoadingIndicator = ({
  width,
  color = "white",
  style,
}: {
  width: number;
  color?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        width: width,
        height: width,
        borderTopColor: color,
        borderBottomColor: color,
        ...style,
      }}
      className={styles.indicator}
    ></div>
  );
};

export default LoadingIndicator;
