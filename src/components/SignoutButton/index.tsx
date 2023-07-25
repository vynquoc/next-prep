"use client";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
  return <button onClick={() => signOut()}>sign out</button>;
};

export default SignoutButton;
