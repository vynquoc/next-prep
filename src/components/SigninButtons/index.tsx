"use client";

import Icon from "../Icon";
import styles from "./styles.module.css";
import icGithub from "@/public/ic_github.svg";
import icGoogle from "@/public/ic_google.svg";
import { signIn } from "next-auth/react";

const SigninButtons = () => {
  const handleSignin = async (type: string) => {
    const response = await signIn(type, {
      callbackUrl: "/",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginIcon} onClick={() => handleSignin("github")}>
        <Icon src={icGithub} width={25} height={25} />
        <p>Sign in with Github</p>
      </div>
      <div className={styles.loginIcon} onClick={() => handleSignin("google")}>
        <Icon src={icGoogle} width={25} height={25} />
        <p>Sign in with Google</p>
      </div>
    </div>
  );
};

export default SigninButtons;
