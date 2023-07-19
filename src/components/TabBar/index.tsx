import styles from "./styles.module.css";
type Props = {
  tabs: string[];
  currentTab: string;
  onTabChange: (tab: string) => void;
};
const TabBar = ({ tabs, currentTab, onTabChange }: Props) => {
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
    </div>
  );
};

export default TabBar;
