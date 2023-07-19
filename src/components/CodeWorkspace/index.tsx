"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Editor from "../Editor";
import LivePreview from "../LivePreview";
import TabBar from "../TabBar";
import Split from "react-split";
type Props = {
  isReact?: boolean;
  challenge?: any;
};

const tabs = ["JAVASCRIPT", "CSS", "HTML"];

const CodeWorkspace = ({ isReact, challenge }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  useEffect(() => {
    setHtml(challenge?.promptCode.html);
    setJs(challenge?.promptCode.js);
    setCss(challenge?.promptCode.css);
  }, [challenge]);
  return (
    <div style={{ height: "100%" }}>
      <TabBar
        tabs={tabs}
        onTabChange={(tab: string) => setCurrentTab(tab)}
        currentTab={currentTab}
      />
      <Split
        className={styles.split}
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div style={{ overflow: "auto", width: "100%" }}>
          {currentTab === "JAVASCRIPT" && <Editor code={js} onChange={setJs} />}
          {currentTab === "CSS" && (
            <Editor language="css" code={css} onChange={setCss} />
          )}
          {currentTab === "HTML" && (
            <Editor
              language="html"
              code={challenge?.promptCode.html}
              onChange={setHtml}
            />
          )}
        </div>
        <div style={{ overflow: "auto", width: "100%" }}>
          <LivePreview
            css={css}
            js={js}
            html={html}
            isReact={isReact}
            componentName={challenge?.reactConfig.componentName}
          />
        </div>
      </Split>
    </div>
  );
};

export default CodeWorkspace;
