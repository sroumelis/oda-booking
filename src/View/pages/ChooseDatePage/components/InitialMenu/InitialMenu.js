import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import takeAway from "./img/take-away.png";
import delivery from "./img/delivery.png";
import dineIn from "./img/dine-in.png";
import { Tab } from "./components/Tab";
import { TabSkeleton } from "./components/TabSkeleton";

const InitialMenu = (props) => {
  const { changeTab, tabOptions, isLoading } = props;
  return (
    <>
      <span className={css(styles.moodText)}>In the mood for...</span>
      <div className={css(styles.initialMenuContainer)}>
        {!isLoading ? (
          <>
            {tabOptions?.[0].enabled && (
              <Tab
                onClick={() => changeTab("Delivery")}
                src={delivery}
                leftText="deliver"
                rightText="eat"
                bottomText="delivery"
              />
            )}
            {tabOptions?.[1].enabled && (
              <Tab
                onClick={() => changeTab("TakeOut")}
                src={takeAway}
                leftText="pick"
                rightText="eat"
                bottomText="take away"
              />
            )}
            {tabOptions?.[2].enabled && (
              <Tab
                onClick={() => changeTab("DineIn")}
                src={dineIn}
                leftText="reserv"
                rightText="eat"
                bottomText="dine in"
              />
            )}
          </>
        ) : (
          <>
            <TabSkeleton />
            <TabSkeleton />
            <TabSkeleton />
          </>
        )}
      </div>
    </>
  );
};

export default InitialMenu;
