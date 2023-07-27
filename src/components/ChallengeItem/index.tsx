import styles from "./styles.module.css";
import Link from "next/link";
import icReact from "@/public/ic_react.svg";
import icFlame from "@/public/ic_flame.svg";
import icHTML from "@/public/ic_html.svg";
import icJs from "@/public/ic_js.svg";
import icCss from "@/public/ic_css.svg";
import icRight from "@/public/ic_right_gray.svg";
import Icon from "../Icon";
import { ChallengeInterface } from "@/types/types";

type Props = {
  challenge: ChallengeInterface;
};

const icons = {
  html: icHTML,
  css: icCss,
  js: icJs,
  react: icReact,
};

const ChallengeItem = ({ challenge }: Props) => {
  return (
    <Link href={`/challenges/${challenge.slug}`}>
      <div className={styles.challengeItem}>
        <div>
          <h4>{challenge.name}</h4>
          <p className={styles.challengePrompt}>{challenge.shortDescription}</p>
          <div className={styles.iconContainer}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon src={icFlame} width={20} height={20} />
              <span className={styles.challengeDifficult}>
                {challenge.difficulty}
              </span>
            </div>
            <div className={styles.tagContainer}>
              {challenge?.tags?.map((tag) => (
                <Icon
                  key={tag}
                  src={icons[tag as keyof typeof icons]}
                  width={25}
                  height={25}
                />
              ))}
            </div>
          </div>
        </div>
        <Icon
          src={icRight}
          width={25}
          height={25}
          style={{ marginLeft: "auto" }}
        />
      </div>
    </Link>
  );
};

export default ChallengeItem;
