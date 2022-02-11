import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";

const HeaderSkeleton = (props) => {
  return (
    <SkeletonTheme
      color={oda.colors.background}
      highlightColor={oda.colors.surface}
    >
      <div className={css(styles.headerOverallContainer)}>
        <div className={css(styles.headerContainer)}>
          <Skeleton circle={true} className={css(styles.shopIcon)} />
          <div className={css(styles.shopInfoAndTabsFlex)}>
            <div className={css(styles.storeInfoGrid)}>
              <div className={css(styles.storeName)}>
                <Skeleton />
              </div>
              <div
                className={css(
                  styles.smallText,
                  styles.rightOnMobileDesign,
                  styles.normalFontSize
                )}
              >
                <Skeleton />
              </div>
              <div className={css(styles.smallText, styles.skeletonGrid)}>
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default HeaderSkeleton;
