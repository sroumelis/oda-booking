import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";

const TabSkeleton = (props) => {
  return (
    <div className={css(styles.width100)}>
      <SkeletonTheme
        color={oda.colors.surface}
        highlightColor={oda.colors.background +'61'}
      >
        <Skeleton className={css(styles.initialTabContainer)} />
      </SkeletonTheme>
    </div>
  );
};

export default TabSkeleton;
