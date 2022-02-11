import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";

const CarouselSkeleton = (props) => {
  const {} = props;
  return (
    <SkeletonTheme
      color={oda.colors.background}
      highlightColor={oda.colors.surface}
      height="100%"
    >
      <div className={css(styles.skeletonContainer)}>
        <Skeleton height="100%" />
      </div>
    </SkeletonTheme>
  );
};

export default CarouselSkeleton;
