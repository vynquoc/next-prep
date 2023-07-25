import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { NavLinks } from "@/constant";
import ThemeButton from "../ThemeButton";
import icUser from "../../../public/ic_user.svg";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import SignoutButton from "../SignoutButton";
const Navbar = async () => {
  const session = await getServerSession(authConfig);

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
      <ThemeButton />
      {!session ? (
        <div className={styles.userWrapper}>
          <Image src={icUser} alt="avatar" className={styles.userIcon} />
        </div>
      ) : (
        <SignoutButton />
      )}
    </nav>
  );
};

export default Navbar;
