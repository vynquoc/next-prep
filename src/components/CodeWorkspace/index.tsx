"use client";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { User } from "next-auth";
import { ChallengeInterface, UserCodeInterface } from "@/types/types";

import Editor from "../Editor";
import CustomSplit from "../Split";
import TabBar from "../TabBar";
import LoadingIndicator from "../LoadingIndicator";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import Modal from "../Modal";

import icDone from "@/public/ic_check_white.svg";
import icReset from "@/public/ic_reset.svg";
import UserOutput from "../UserOutput";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isReact?: boolean;
  challenge?: ChallengeInterface;
  userCode?: UserCodeInterface;
  user?: User;
};

const tabs = ["JAVASCRIPT", "CSS", "HTML"];

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
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(tab);
  const [userCodeId, setUserCodeId] = useState(userCode?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(user ? false : true);
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
    if (user && !userCodeId) {
      const lang = challenge?.languageToWrite;
      if (!userCodeId) {
        if (lang === "css") {
          createUserCode(challenge?.promptCode?.css as string);
        } else if (lang === html) {
          createUserCode(challenge?.promptCode?.html as string);
        } else {
          createUserCode(challenge?.promptCode?.js as string);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (user && userCodeId) {
      let timer: NodeJS.Timeout;

      const handleDebouncedChange = () => {
        setIsLoading(true);
        let updatedCode;
        if (challenge?.languageToWrite === "css") {
          updatedCode = css;
        } else if (challenge?.languageToWrite === "html") {
          updatedCode = html;
        } else {
          updatedCode = js;
        }
        updateUserCode(updatedCode as string);
        setIsLoading(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      };

      setIsLoading(true);
      timer = setTimeout(handleDebouncedChange, 800);

      return () => clearTimeout(timer);
    }
  }, [css, html, js]);

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

  const handleChange = (lang: string, value: string) => {
    if (lang === "css") {
      setCss(value);
    } else if (lang === "html") {
      setHtml(value);
    } else {
      setJs(value);
    }
  };

  const updateUserCode = async (code: string) => {
    await fetch("/api/user-code", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userCodeId, code: code }),
    });
    setIsLoading(false);
  };

  const createUserCode = async (code: string) => {
    const response = await fetch("/api/user-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ challenge: challenge?.slug, code: code }),
    });
    const userCode = await response.json();
    setUserCodeId(userCode?.id);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <p className={styles.message}>
          <Link
            className={styles.link}
            href={`/login?from=${encodeURIComponent(pathname)}`}
          >
            Login
          </Link>{" "}
          to save your progress
        </p>
      </Modal>
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
          {user ? (
            isLoading ? (
              <LoadingIndicator width={25} />
            ) : (
              <Tooltip text="Code saved">
                <Icon src={icDone} width={25} height={25} />
              </Tooltip>
            )
          ) : null}
        </div>
      </div>

      <CustomSplit
        direction="vertical"
        sizes={[50, 50]}
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div style={{ overflow: "auto", height: "100%" }}>
          {currentTab === "JAVASCRIPT" && (
            <Editor
              code={js}
              onChange={(value: string) => handleChange("js", value)}
            />
          )}
          {currentTab === "CSS" && (
            <Editor
              language="css"
              code={css}
              editable={challenge?.languageToWrite === "css"}
              onChange={(value: string) => handleChange("css", value)}
            />
          )}
          {currentTab === "HTML" && (
            <Editor
              language="html"
              editable={challenge?.languageToWrite === "html"}
              code={html}
              onChange={(value: string) => handleChange("html", value)}
            />
          )}
        </div>
        <UserOutput
          html={html}
          css={css}
          js={js}
          isReact={isReact}
          componentName={challenge?.reactConfig?.componentName}
        />
      </CustomSplit>
    </div>
  );
};

export default CodeWorkspace;
