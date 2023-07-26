import styles from "./styles.module.css";

import CredentialsForm from "@/components/CredentialsForm";
import SigninButtons from "@/components/SigninButtons";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <CredentialsForm />
        <hr />
        <SigninButtons />
      </div>
    </div>
  );
};
export default LoginPage;
