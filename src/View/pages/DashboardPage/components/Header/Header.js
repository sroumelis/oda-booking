import React from "react";
import { withStyles } from "@material-ui/styles";
import { navigate } from "@reach/router";

import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Tabs } from "./components/Tabs";
import { HeaderSkeleton } from "./components/HeaderSkeleton";
import noImageAvailable from "../../../../common/img/no-image-available.jpg";

const Header = (props) => {
  const { storeInfo, selectedTab, setTab, tabOptions, isLoading } = props;
  return (
    <div
      className={css(styles.headerRow, !selectedTab && styles.headerBoxShadow)}
    >
      {!isLoading ? (
        <div className={css(styles.headerOverallContainer)}>
          <div className={css(styles.headerContainer)}>
            <img
              className={css(styles.shopIcon)}
              src={storeInfo?.logo || noImageAvailable}
              alt=""
            />
            <div className={css(styles.shopInfoAndTabsFlex)}>
              <div className={css(styles.storeInfoGrid)}>
                <div className={css(styles.storeName)}>
                  {storeInfo?.name || "-"}
                </div>
                <div
                  className={css(
                    styles.smallText,
                    styles.rightOnMobileDesign,
                    styles.normalFontSize
                  )}
                >
                  {`${storeInfo?.foodCategory} Cuisine` || "-"}
                </div>
                <div
                  className={css(
                    styles.additionalStoreInfoFlex,
                    styles.rightOnMobileDesign
                  )}
                >
                  <div
                    className={css(
                      styles.smallText,
                      styles.headerTextWithTitle
                    )}
                  >
                    <span className={css(styles.grayText)}>Min. Order</span>
                    {storeInfo?.minOrder || "-"}
                  </div>
                  <div
                    className={css(
                      styles.smallText,
                      styles.headerTextWithTitle
                    )}
                  >
                    <span className={css(styles.grayText)}>
                      Estimated Delivery Time
                    </span>
                    {storeInfo?.deliveryTime || "-"}
                  </div>
                </div>
              </div>
              {selectedTab && (
                <Tabs
                  tabOptions={tabOptions}
                  setTab={setTab}
                  selectedTab={selectedTab}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <HeaderSkeleton />
      )}
    </div>
  );
};

export default Header;
