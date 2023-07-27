import LivePreview from "../LivePreview";
import TabBar from "../TabBar";
import { useState } from "react";

const tabs = ["Expected Output"];

type Props = {
  challenge?: any;
};

const ChallengeDemo = ({ challenge }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <div>
      <TabBar
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
      />
      <LivePreview
        html={challenge?.promptCode.html}
        js={challenge?.promptCode.js}
        css={challenge?.promptCode.css}
        componentName={challenge?.reactConfig.componentName}
        isReact={challenge?.languageToWrite === "jsx"}
      />
    </div>
  );
};

export default ChallengeDemo;
