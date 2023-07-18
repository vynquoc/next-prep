"use client";
import styles from "./styles.module.css";

import CodeWorkspace from "@/components/CodeWorkspace";

const ChallengePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.descriptionContainer}>Description</div>
      <div className={styles.editorContainer}>
        <CodeWorkspace />
      </div>
    </div>
  );
};

export default ChallengePage;
