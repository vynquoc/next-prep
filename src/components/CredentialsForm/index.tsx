"use client";
import styles from "./styles.module.css";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import FormField from "../FormField";
import { useRouter } from "next/navigation";

const CredentialsForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleFieldChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const signInResponse = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    if (signInResponse && !signInResponse.error) {
      router.push("/");
    } else {
      console.log("ERROR", signInResponse);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <FormField
          title="Email"
          placeholder="Email"
          state={form.email}
          onFieldChange={(value) => handleFieldChange("email", value)}
        />
        <FormField
          type="password"
          title="Password"
          placeholder="Password"
          state={form.password}
          onFieldChange={(value) => handleFieldChange("password", value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default CredentialsForm;
