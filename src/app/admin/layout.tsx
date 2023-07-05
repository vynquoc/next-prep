import SideBarAdmin from "@/components/(admin)/SideBar";
import styles from "./layout.module.css";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.adminLayout}>
      <SideBarAdmin />
      {children}
    </div>
  );
};

export default AdminLayout;
