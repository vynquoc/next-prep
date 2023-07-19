"use client";
import styles from "./styles.module.css";
import Editor from "@/components/Editor";
import Split from "react-split";

import CodeWorkspace from "@/components/CodeWorkspace";

const ChallengePage = () => {
  return (
    <Split className="split" sizes={[40, 60]}>
      <div>des</div>
      <div style={{ height: "100vh" }}>
        <CodeWorkspace />
      </div>
    </Split>
  );
};

export default ChallengePage;
