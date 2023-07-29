"use client";
import { useState } from "react";
import Icon from "../Icon";
import styles from "./styles.module.css";
import icUser from "@/public/ic_user_white.svg";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const User = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = session?.data?.user;

  return (
    <div className={styles.userWrapper} onClick={() => setIsOpen(!isOpen)}>
      <Icon src={icUser} width={20} height={20} />
      {isOpen && (
        <div className={styles.dropdown}>
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
      )}
    </div>
  );
};

export default User;
