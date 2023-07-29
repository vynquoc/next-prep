import Link from "next/link";
import styles from "./styles.module.css";
import { NavLinks } from "@/constant";

import User from "../User";

const Navbar = async () => {
  return (
    <nav className={styles.wrapper}>
      <Link href="/">
        <span className={styles.logoText}>
          next<span className={styles.logoTextMain}>prep</span>
        </span>
      </Link>
      <ul className={styles.linksWrapper}>
        {NavLinks.map((link) => (
          <Link href={link.href} key={link.text} className={styles.link}>
            {link.text}
          </Link>
        ))}
      </ul>
      <User />
    </nav>
  );
};

export default Navbar;
