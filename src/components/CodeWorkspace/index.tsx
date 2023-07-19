import React, { useState } from "react";
import styles from "./styles.module.css";
import Editor from "../Editor";
import LivePreview from "../LivePreview";
import Split from "react-split";
type Props = {
  isReact?: boolean;
};

const tabs = ["JAVASCRIPT", "CSS", "HTML"];

const CodeWorkspace = ({ isReact }: Props) => {
  const [currentTab, setCurrentTab] = useState("JAVASCRIPT");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState(`
  function Counter() {
     const [count, setCount] =
       React.useState(0)
     return (
       
       <div>
      
         <h3 className="h3" style={{
           background: 'darkslateblue',
           padding: 8,
           borderRadius: 4
         }}>
           Count: {count} 🧮
         </h3>
         <button
           onClick={() =>
             setCount(c => c + 1)
           }>
           Increment
         </button>
       </div>
     
     )
   }
 
 `);

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.header}>
        <div className={styles.tabContainer}>
          {tabs.map((tab) => (
            <div
              className={
                tab === currentTab
                  ? `${styles.tab} ${styles.tabActive}`
                  : `${styles.tab}`
              }
              key={tab}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
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
            <Editor language="html" code={html} onChange={setHtml} />
          )}
        </div>
        <div style={{ overflow: "auto", width: "100%" }}>
          <LivePreview css={css} js={js} html={html} componentName="Quiz" />
        </div>
      </Split>
    </div>
  );
};

export default CodeWorkspace;
