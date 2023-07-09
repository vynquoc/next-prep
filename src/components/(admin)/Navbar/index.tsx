import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import ThemeButton from "@/components/ThemeButton";
import icUser from "@/public/ic_user.svg";

const AdminNavbar = () => {
  return (
    <nav className={styles.wrapper}>
      <Link href="/admin">
        <span className={styles.logoText}>
          Next<span className={styles.logoTextMain}>PrepAdmin</span>
        </span>
      </Link>
      <div style={{ display: "flex" }}>
        <ThemeButton />
        <div className={styles.userWrapper}>
          <Image src={icUser} alt="avatar" className={styles.userIcon} />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
