"use client";
import React, { useState } from "react";
import CustomSplit from "../Split";
import styles from "./styles.module.css";
import Editor from "../Editor";
import LivePreview from "../LivePreview";
import TabBar from "../TabBar";
import { ChallengeInterface } from "@/types/types";
import { debounce } from "@/utils";

type Props = {
  isReact?: boolean;
  challenge?: ChallengeInterface;
};

const tabs = ["JAVASCRIPT", "CSS", "HTML"];

const CodeWorkspace = ({ isReact, challenge }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [html, setHtml] = useState(challenge?.promptCode?.html);
  const [css, setCss] = useState(challenge?.promptCode?.css);
  const [js, setJs] = useState(challenge?.promptCode?.js);

  const debouncedSetHtml = debounce(setHtml, 500);
  const debouncedSetJs = debounce(setJs, 500);
  const debouncedSetCss = debounce(setCss, 500);
  return (
    <div style={{ height: "100%" }}>
      <TabBar
        tabs={tabs}
        onTabChange={(tab: string) => setCurrentTab(tab)}
        currentTab={currentTab}
      />
      <CustomSplit
        className={styles.split}
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div style={{ overflow: "auto", width: "100%" }}>
          {currentTab === "JAVASCRIPT" && (
            <Editor code={js} onChange={debouncedSetJs} />
          )}
          {currentTab === "CSS" && (
            <Editor language="css" code={css} onChange={debouncedSetCss} />
          )}
          {currentTab === "HTML" && (
            <Editor
              language="html"
              code={challenge?.promptCode?.html}
              onChange={debouncedSetHtml}
            />
          )}
        </div>
        <div style={{ overflow: "auto", width: "100%" }}>
          <LivePreview
            css={css}
            js={js}
            html={html}
            isReact={isReact}
            componentName={challenge?.reactConfig?.componentName}
          />
        </div>
      </CustomSplit>
    </div>
  );
};

export default CodeWorkspace;
