import styles from "./styles.module.css";
import Link from "next/link";
import icReact from "@/public/ic_react.svg";
import icFlame from "@/public/ic_flame.svg";
import icHTML from "@/public/ic_html.svg";
import icJs from "@/public/ic_js.svg";
import icCss from "@/public/ic_css.svg";
import icRight from "@/public/ic_right_gray.svg";
import icCheck from "@/public/ic_check_green.svg";
import Icon from "../Icon";
import { ChallengeInterface } from "@/types/types";
import Tooltip from "../Tooltip";

type Props = {
  challenge: ChallengeInterface & {
    completed?: boolean;
  };
};

const icons = {
  html: { icon: icHTML, width: 15, height: 16 },
  css: { icon: icCss, width: 18, height: 18 },
  js: { icon: icJs, width: 13, height: 13 },
  react: { icon: icReact, width: 15, height: 16 },
};

const ChallengeItem = ({ challenge }: Props) => {
  return (
    <Link
      className={styles.challengeItem}
      href={`/challenges/${challenge.slug}`}
    >
      {challenge?.completed ? (
        <Tooltip text="Completed">
          <Icon
            src={icCheck}
            width={40}
            height={40}
            style={{ marginRight: 5 }}
          />
        </Tooltip>
      ) : (
        <Tooltip text="Not completed">
          <div className={styles.mark}></div>
        </Tooltip>
      )}

      <div>
        <h4>{challenge.name}</h4>
        <p className={styles.challengePrompt}>{challenge.shortDescription}</p>
        <div className={styles.iconContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon src={icFlame} width={18} height={18} />
            <span
              className={styles.challengeDifficult}
              style={{
                color:
                  challenge.difficulty === "medium"
                    ? "orange"
                    : challenge.difficulty === "easy"
                    ? "green"
                    : "red",
              }}
            >
              {`${challenge.difficulty
                ?.charAt(0)
                .toUpperCase()}${challenge.difficulty?.slice(1)}`}
            </span>
          </div>
          <div className={styles.tagContainer}>
            {challenge?.tags?.map((tag) =>
              tag !== "html" ? (
                <Icon
                  key={tag}
                  src={icons[tag as keyof typeof icons].icon}
                  width={icons[tag as keyof typeof icons].width}
                  height={icons[tag as keyof typeof icons].height}
                />
              ) : (
                <Icon
                  key={tag}
                  src={icons[tag as keyof typeof icons].icon}
                  width={icons[tag as keyof typeof icons].width}
                  height={icons[tag as keyof typeof icons].height}
                  style={{ marginTop: "2px" }}
                />
              )
            )}
          </div>
        </div>
      </div>
      <Icon
        src={icRight}
        width={25}
        height={25}
        style={{ marginLeft: "auto" }}
      />
    </Link>
  );
};

export default ChallengeItem;
