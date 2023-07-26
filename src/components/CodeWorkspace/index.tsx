"use client";
import React, { useCallback, useEffect, useState } from "react";
import CustomSplit from "../Split";
import styles from "./styles.module.css";
import Editor from "../Editor";
import LivePreview from "../LivePreview";
import TabBar from "../TabBar";
import { ChallengeInterface, UserCodeInterface } from "@/types/types";
import { debounce } from "@/utils";
import { useSession } from "next-auth/react";

type Props = {
  isReact?: boolean;
  challenge?: ChallengeInterface;
  userCode?: UserCodeInterface;
};

const tabs = ["JAVASCRIPT", "CSS", "HTML"];
const delay = 500;

const CodeWorkspace = ({ isReact, challenge, userCode }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [html, setHtml] = useState(
    (challenge?.languageToWrite === "html" && userCode?.code) ||
      challenge?.promptCode?.html
  );
  const [css, setCss] = useState(
    (challenge?.languageToWrite === "css" && userCode?.code) ||
      challenge?.promptCode?.css
  );
  const [js, setJs] = useState(
    ((challenge?.languageToWrite === "js" ||
      challenge?.languageToWrite === "jsx") &&
      userCode?.code) ||
      challenge?.promptCode?.js
  );
  const session = useSession();
  const user = session?.data?.user;
  const updateUserCode = async (code: string) => {
    await fetch("/api/user-code", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userCode?.id, code: code }),
    });
    setIsLoading(false);
  };

  const createUserCode = async (code: string) => {
    await fetch("/api/user-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ challenge: challenge?.slug, code: code }),
    });
  };

  useEffect(() => {
    setIsLoading(false);
    if (user) {
      if (!userCode) {
        createUserCode(js as string);
      } else {
        const lang = challenge?.languageToWrite;
        setIsLoading(true);
        if (lang === "css") {
          updateUserCode(css as string);
        } else if (lang === "html") {
          updateUserCode(html as string);
        } else {
          updateUserCode(js as string);
        }
      }
    }
  }, [html, js, css]);

  const debouncedSetHtml = debounce(setHtml, delay);
  const debouncedSetJs = debounce(setJs, delay);
  const debouncedSetCss = debounce(setCss, delay);

  return (
    <div style={{ height: "100%" }}>
      <TabBar
        tabs={tabs}
        onTabChange={(tab: string) => setCurrentTab(tab)}
        currentTab={currentTab}
        isLoading={isLoading}
      />
      {!user && (
        <div className={styles.warningLogin}>
          Please login to save your code
        </div>
      )}
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
            <Editor language="html" code={html} onChange={debouncedSetHtml} />
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
