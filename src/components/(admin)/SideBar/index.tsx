"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import { AdminTabs } from "@/constant";

const SideBarAdmin = () => {
  const pathname = usePathname();
  return (
    <div className={styles.sideBar}>
      <ul className={styles.routesWrapper}>
        {AdminTabs.map((tab) => {
          let className = styles.tabRoute;
          if (pathname === tab.href) {
            className = `${className} ${styles.active}`;
          }
          return (
            <li className={styles.tabRouteWrapper} key={tab.text}>
              <Link className={className} href={tab.href}>
                {tab.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBarAdmin;
