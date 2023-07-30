import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import icClose from "@/public/ic_close.svg";

import Icon from "../Icon";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

const Modal = ({ isOpen, onClose, className, children }: Props) => {
  const [domReady, setDomReady] = useState(false);
  useEffect(() => {
    setDomReady(true);
  }, []);
  return domReady
    ? ReactDom.createPortal(
        <>
          {isOpen && <div className={styles.overlay}></div>}
          <div
            className={
              !isOpen
                ? `${styles.modal} ${className}`
                : `${styles.modal} ${styles.isOpen} ${className}`
            }
          >
            {onClose && (
              <button onClick={onClose} className={styles.closeBtn}>
                <Icon src={icClose} width={30} height={30} />
              </button>
            )}
            <div>{children}</div>
          </div>
        </>,
        document.getElementById("modalPortal")!
      )
    : null;
};

export default Modal;
