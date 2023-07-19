import styles from "./styles.module.css";
import { useState } from "react";
import Image from "next/image";
import icDown from "@/public/ic_down.svg";
import icUp from "@/public/ic_up.svg";

type Props = {
  children?: React.ReactNode;
  title: string;
};

const Accordion = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={styles.container}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className={styles.header}>
        <p>{title}</p>
        <Image
          src={icDown}
          alt="ic"
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
        />
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
