import ReactDom from "react-dom";
import styles from "./styles.module.css";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

const Modal = ({ isOpen, onClose, className, children }: Props) => {
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={`${styles.modal} ${className}`}>
        <button onClick={onClose}>close</button>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById("modalPortal")!
  );
};

export default Modal;
