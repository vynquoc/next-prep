import styles from "./styles.module.css";
import { useState } from "react";

import LivePreview from "../LivePreview";
import TabBar from "../TabBar";
import Tooltip from "../Tooltip";
import Icon from "../Icon";

import icInfo from "@/public/ic_infor.svg";

const tabs = ["Output"];

type Props = {
  html?: string;
  css?: string;
  js?: string;
  isReact?: boolean;
  componentName?: string;
};

const UserOutput = ({ html, css, js, isReact, componentName }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <div>
      <div className={styles.header}>
        <TabBar
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
        />
        <div>
          <Tooltip text="Open browser console to see your error or log messages">
            <Icon src={icInfo} width={23} height={23} />
          </Tooltip>
        </div>
      </div>
      <LivePreview
        html={html}
        css={css}
        js={js}
        isReact={isReact}
        componentName={componentName}
      />
    </div>
  );
};

export default UserOutput;
