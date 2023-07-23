import styles from "./styles.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Accordion from "../Accordion";
import icInfor from "@/public/ic_infor.svg";
import remarkGfm from "remark-gfm";

const ChallengePrompt = ({ challenge }: any) => {
  return (
    <div className={styles.promptContainer}>
      <div className={styles.category}>
        <h4>Category: </h4>
        <p>{challenge?.category}</p>
      </div>
      <h2 className={styles.name}>{challenge?.name}</h2>
      <div className={styles.note}>
        <div className={styles.iconWrapper}>
          <Image src={icInfor} alt="infor" className={styles.icon} />
        </div>
        <p>
          This challenge has pre-written CSS code, you can access but do not
          modify it.
        </p>
      </div>
      {/* <ReactMarkdown children={challenge?.prompt} remarkPlugins={[remarkGfm]} /> */}
      <ReactMarkdown className="markdown">{challenge?.prompt}</ReactMarkdown>
      <h3 style={{ margin: "10px 0" }}>Hints</h3>
      {challenge?.hints.map((hint: string, index: number) => (
        <Accordion
          key={index + hint}
          title={`Hint ${index + 1}`}
          children={<p>{hint}</p>}
        />
      ))}
    </div>
  );
};

export default ChallengePrompt;