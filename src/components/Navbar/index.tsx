import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { NavLinks } from "@/constant";
import ThemeButton from "../ThemeButton";
import icUser from "../../../public/ic_user.svg";

const Navbar = () => {
  return (
    <nav className={styles.wrapper}>
      <Link href="/">
        <span className={styles.logoText}>
          Next<span className={styles.logoTextMain}>Prep</span>
        </span>
      </Link>
      <ul className={styles.linksWrapper}>
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.text} className={styles.link}>
            {link.text}
          </Link>
        ))}
      </ul>
      <ThemeButton />
      <div className={styles.userWrapper}>
        <Image src={icUser} alt="avatar" className={styles.userIcon} />
      </div>
    </nav>
  );
};

export default Navbar;
