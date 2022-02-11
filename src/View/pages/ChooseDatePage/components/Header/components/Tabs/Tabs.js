import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import takeAwayBlue from "./img/blue-take-away.png";
import deliveryBlue from "./img/blue-delivery.png";
import dineInBlue from "./img/blue-dine-in.png";
import takeAway from "../../../InitialMenu/img/take-away.png";
import delivery from "../../../InitialMenu/img/delivery.png";
import dineIn from "../../../InitialMenu/img/dine-in.png";
import { HeaderTab } from "./components/HeaderTab";

const Tabs = (props) => {
  const { setTab, selectedTab, tabOptions } = props;

  return tabOptions ? (
    <div className={css(styles.tabsContainer)}>
      {tabOptions[0]?.enabled && (
        <HeaderTab
          changeSelectedTab={() => setTab("Delivery")}
          isSelected={selectedTab === "Delivery"}
          upperText="staying in"
          redText="deliver"
          yellowText="eat"
          image={delivery}
          selectedImage={deliveryBlue}
        />
      )}
      {tabOptions[1]?.enabled && (
        <HeaderTab
          changeSelectedTab={() => setTab("TakeOut")}
          isSelected={selectedTab === "TakeOut"}
          upperText="take away"
          redText="pick"
          yellowText="eat"
          image={takeAway}
          selectedImage={takeAwayBlue}
        />
      )}
      {tabOptions[2]?.enabled && (
        <HeaderTab
          changeSelectedTab={() => setTab("DineIn")}
          isSelected={selectedTab === "DineIn"}
          upperText="dine in"
          redText="reserv"
          yellowText="eat"
          image={dineIn}
          selectedImage={dineInBlue}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export default Tabs;
