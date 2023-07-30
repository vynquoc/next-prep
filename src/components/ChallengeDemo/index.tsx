import { ChallengeInterface } from "@/types/types";
import LivePreview from "../LivePreview";
import TabBar from "../TabBar";
import { useState } from "react";

const tabs = ["Expected Output"];

type Props = {
  challenge?: ChallengeInterface;
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
        html={
          challenge?.languageToWrite === "html"
            ? challenge?.solution
            : challenge?.promptCode?.html
        }
        css={
          challenge?.languageToWrite === "css"
            ? challenge?.solution
            : challenge?.promptCode?.css
        }
        js={
          challenge?.languageToWrite === "jsx" ||
          challenge?.languageToWrite === "javascript"
            ? challenge?.solution
            : challenge?.promptCode?.js
        }
        componentName={challenge?.reactConfig?.componentName}
        isReact={challenge?.languageToWrite === "jsx"}
      />
    </div>
  );
};

export default ChallengeDemo;
