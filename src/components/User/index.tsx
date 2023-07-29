"use client";
import { useRef, useState } from "react";
import Icon from "../Icon";
import styles from "./styles.module.css";
import icUser from "@/public/ic_user_white.svg";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useClickOutside from "@/hooks/userClickOutside";

const User = () => {
  const session = useSession();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const user = session?.data?.user;

  return (
    <div className={styles.userWrapper} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <Icon src={icUser} width={20} height={20} />
      </div>
      <div
        className={
          isOpen ? `${styles.dropdown} ${styles.open}` : styles.dropdown
        }
      >
        {user ? (
          <>
            <p>
              <span>Welcome, </span>
              {user?.name}
            </p>
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <Link href="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default User;
