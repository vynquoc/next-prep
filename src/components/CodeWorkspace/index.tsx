"use client";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { User } from "next-auth";
import { ChallengeInterface, UserCodeInterface } from "@/types/types";
import { debounce } from "@/utils";

import Editor from "../Editor";
import LivePreview from "../LivePreview";
import CustomSplit from "../Split";
import TabBar from "../TabBar";
import LoadingIndicator from "../LoadingIndicator";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

import icDone from "@/public/ic_check_white.svg";
import icReset from "@/public/ic_reset.svg";

type Props = {
  isReact?: boolean;
  challenge?: ChallengeInterface;
  userCode?: UserCodeInterface;
  user?: User;
};

const tabs = ["JAVASCRIPT", "CSS", "HTML"];
const delay = 300;

const CodeWorkspace = ({ isReact, challenge, userCode, user }: Props) => {
  let tab = tabs[0];
  switch (challenge?.languageToWrite) {
    case "css":
      tab = tabs[1];
      break;
    case "html":
      tab = tabs[2];
    default:
      tab = tabs[0];
      break;
  }
  const [currentTab, setCurrentTab] = useState(tab);
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
    ((challenge?.languageToWrite === "javascript" ||
      challenge?.languageToWrite === "jsx") &&
      userCode?.code) ||
      challenge?.promptCode?.js
  );

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

  const handleReset = () => {
    switch (challenge?.languageToWrite) {
      case "jsx" || "javascript":
        setJs(challenge.promptCode?.js);
        break;
      case "html":
        setHtml(challenge.promptCode?.html);
        break;
      case "css":
        setCss(challenge.promptCode?.css);
        break;
    }
  };

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

  const debouncedSetHtml = debounce(setHtml, delay);
  const debouncedSetJs = debounce(setJs, delay);
  const debouncedSetCss = debounce(setCss, delay);

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.header}>
        <TabBar
          tabs={tabs}
          onTabChange={(tab: string) => setCurrentTab(tab)}
          currentTab={currentTab}
        />
        <div className={styles.rightTab}>
          <Tooltip text="Reset default code">
            <div className={styles.reset} onClick={handleReset}>
              <Icon src={icReset} width={25} height={25} />
            </div>
          </Tooltip>
          {isLoading ? (
            <LoadingIndicator width={25} />
          ) : (
            <Icon src={icDone} width={25} height={25} />
          )}
        </div>
      </div>

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
