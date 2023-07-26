import Icon from "../Icon";
import LoadingIndicator from "../LoadingIndicator";
import icDone from "@/public/ic_check_white.svg";
import styles from "./styles.module.css";
type Props = {
  tabs: string[];
  currentTab: string;
  onTabChange: (tab: string) => void;
  isLoading?: boolean;
};
const TabBar = ({ tabs, currentTab, onTabChange, isLoading }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <div
            className={
              tab === currentTab
                ? `${styles.tab} ${styles.tabActive}`
                : `${styles.tab}`
            }
            key={tab}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      {typeof isLoading !== "undefined" && isLoading ? (
        <LoadingIndicator width={25} />
      ) : typeof isLoading !== "undefined" && !isLoading ? (
        <Icon src={icDone} width={25} height={25} />
      ) : null}
    </div>
  );
};

export default TabBar;
