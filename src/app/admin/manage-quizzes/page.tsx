"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import QuizForm from "@/components/(admin)/QuizForm";
import Modal from "@/components/Modal";

const QuizManager = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create Quiz</button>
      <Modal
        className={styles.modalStyle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <QuizForm />
      </Modal>
    </div>
  );
};

export default QuizManager;
