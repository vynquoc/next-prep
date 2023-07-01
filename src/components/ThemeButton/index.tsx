import icSun from "../../../public/ic_sun.svg";
import Image from "next/image";
import styles from "./styles.module.css";
const ThemeButton = () => {
  return (
    <div className={styles.wrapper}>
      <Image src={icSun} alt="sun icon" className={styles.iconImage} />
    </div>
  );
};

export default ThemeButton;
