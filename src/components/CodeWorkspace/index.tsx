"use client";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "next-auth";
import CustomSplit from "../Split";
import styles from "./styles.module.css";
import Editor from "../Editor";
import LivePreview from "../LivePreview";
import TabBar from "../TabBar";
import { ChallengeInterface, UserCodeInterface } from "@/types/types";
import { debounce } from "@/utils";

type Props = {
  isReact?: boolean;
  challenge?: ChallengeInterface;
  userCode?: UserCodeInterface;
  user?: User;
};

const tabs = ["JAVASCRIPT", "CSS", "HTML"];
const delay = 300;

const CodeWorkspace = ({ isReact, challenge, userCode, user }: Props) => {
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

  const updateUserCode = useCallback(async (code: string) => {
    await fetch("/api/user-code", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userCode?.id, code: code }),
    });
    setIsLoading(false);
  }, []);

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
    <div style={{ height: "100vh" }}>
      <TabBar
        tabs={tabs}
        onTabChange={(tab: string) => setCurrentTab(tab)}
        currentTab={currentTab}
        isLoading={isLoading}
      />

      <CustomSplit
        direction="vertical"
        sizes={[50, 50]}
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div style={{ overflow: "auto" }}>
          {!user && (
            <div className={styles.warningLogin}>
              Please login to save your code
            </div>
          )}
          {currentTab === "JAVASCRIPT" && (
            <Editor code={js} onChange={debouncedSetJs} />
          )}
          {currentTab === "CSS" && (
            <Editor
              language="css"
              code={css}
              editable={challenge?.languageToWrite === "css"}
              onChange={debouncedSetCss}
            />
          )}
          {currentTab === "HTML" && (
            <Editor
              language="html"
              editable={challenge?.languageToWrite === "html"}
              code={html}
              onChange={debouncedSetHtml}
            />
          )}
        </div>
        <LivePreview
          css={css}
          js={js}
          html={html}
          isReact={isReact}
          componentName={challenge?.reactConfig?.componentName}
          hasTabs={true}
        />
      </CustomSplit>
    </div>
  );
};

export default CodeWorkspace;
