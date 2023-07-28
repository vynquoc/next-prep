"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./styles.module.css";

import icGithub from "@/public/ic_github.svg";
import icGoogle from "@/public/ic_google.svg";

import Icon from "../Icon";
import LoadingIndicator from "../LoadingIndicator";

const SigninButtons = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSignin = async (type: string) => {
    if (type === "github") {
      setIsLoading(true);
    }
    try {
      await signIn(type, {
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginIcon} onClick={() => handleSignin("github")}>
        <Icon src={icGithub} width={25} height={25} />
        {isLoading ? (
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <LoadingIndicator width={25} color="var(--primary-color)" />
          </div>
        ) : (
          <p>Sign in with Github</p>
        )}
      </div>
      <div className={styles.loginIcon} onClick={() => handleSignin("google")}>
        <Icon src={icGoogle} width={25} height={25} />
        <p>Sign in with Google</p>
      </div>
    </div>
  );
};

export default SigninButtons;
