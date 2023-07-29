import Link from "next/link";
import styles from "./styles.module.css";
import { NavLinks } from "@/constant";

import User from "../User";
import { getCurrentUser } from "@/lib/session";

const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <nav className={styles.wrapper}>
      <Link href="/">
        <span className={styles.logoText}>
          next<span className={styles.logoTextMain}>prep</span>
        </span>
      </Link>
      <ul className={styles.linksWrapper}>
        {user?.role === "admin" && (
          <Link href="/admin" className={styles.link}>
            ADMIN
          </Link>
        )}
        {user?.role === "user" && (
          <>
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.text} className={styles.link}>
                {link.text}
              </Link>
            ))}
          </>
        )}
        {!user && (
          <>
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.text} className={styles.link}>
                {link.text}
              </Link>
            ))}
          </>
        )}
      </ul>
      <User />
    </nav>
  );
};

export default Navbar;
