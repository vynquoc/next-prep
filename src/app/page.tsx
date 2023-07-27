import styles from "./page.module.css";
import reactGif from "@/public/react-gif.gif";
import home1 from "@/public/home-1.svg";
import home2 from "@/public/home-2.svg";
import home3 from "@/public/home-3.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.topBanner}>
        <h1>AN EASY WAY TO PREPARE FOR YOUR NEXT INTERVIEW</h1>
        <h1>BY</h1>
        <h1>SOLVING AWESOME CHALLENGES</h1>
        <Image src={reactGif} alt="react gif" className={styles.gifImg} />
        <section className={styles.featuresContainer}>
          <h2 style={{ margin: "20px 0" }}>
            Level up your interview game with nextprep
          </h2>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <Image src={home1} alt="home 1" className={styles.featureImg} />
              <h3 className={styles.featureTitle}>React focused</h3>
              <p className={styles.featureDesc}>
                Although any web developer can use reacterry, there's no denying
                that it was built by React devs, for React dev.
              </p>
            </div>
            <div className={styles.featureItem}>
              <Image src={home2} alt="home 1" className={styles.featureImg} />
              <h3 className={styles.featureTitle}>Coding challenges</h3>
              <p className={styles.featureDesc}>
                Improve your technical interview skills by working on coding
                challenges taken straight from real interviews.
              </p>
            </div>
            <div className={styles.featureItem}>
              <Image src={home3} alt="home 1" className={styles.featureImg} />
              <h3 className={styles.featureTitle}>Deep dive</h3>
              <p className={styles.featureDesc}>
                Take a deep dive into technicalities and gotchas of webdev with
                our expert-curated content.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
