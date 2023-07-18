"use client";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import ReactEditor from "../ReactEditor";
import JSEditor from "../JSEditor";
import React, { useState } from "react";
import { debounce } from "@/utils";
import styles from "./styles.module.css";

type Props = {
  isReact?: boolean;
  html?: string;
  css?: string;
  js?: string;
  setHtml?: any;
  setCss?: any;
  setJs?: any;
};

const ReactEditorTabs = ["JSX", "CSS"];

const JSEditorTabs = ["JAVASCRIPT", "HTML", "CSS"];

const delayType = 500;

const CodeEditor = ({
  isReact,
  html,
  css,
  js,
  setCss,
  setHtml,
  setJs,
}: Props) => {
  const [lang, setLang] = useState(
    isReact ? ReactEditorTabs[0] : JSEditorTabs[0]
  );

  const handleChangeLang = (lang: string) => {
    setLang(lang);
  };

  const debouncedSetCss = debounce(setCss, delayType);
  const debouncedSetJs = debounce(setJs, delayType);
  const debouncedSetHtml = debounce(setHtml, delayType);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.tabContainer}>
          {isReact
            ? ReactEditorTabs.map((tab) => (
                <div
                  className={
                    lang === tab
                      ? `${styles.tab} ${styles.tabActive}`
                      : `${styles.tab}`
                  }
                  key={tab}
                  onClick={() => handleChangeLang(tab)}
                >
                  {tab}
                </div>
              ))
            : JSEditorTabs.map((tab) => (
                <div
                  className={
                    lang === tab
                      ? `${styles.tab} ${styles.tabActive}`
                      : `${styles.tab}`
                  }
                  key={tab}
                  onClick={() => handleChangeLang(tab)}
                >
                  {tab}
                </div>
              ))}
        </div>
      </div>
      <div>
        {isReact ? (
          <ReactEditor
            currentLang={lang}
            css={css}
            js={js}
            setCss={debouncedSetCss}
            setJs={debouncedSetJs}
          />
        ) : (
          <JSEditor
            currentLang={lang}
            html={html}
            css={css}
            js={js}
            setCss={debouncedSetCss}
            setJs={debouncedSetJs}
            setHtml={debouncedSetHtml}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
