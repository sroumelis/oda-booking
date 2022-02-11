import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";

const OrderInfoGenericSkeleton = (props) => {
  const { secondLine, marginTopOnFirst, emulateTextField, emulateButton } =
    props;

  if (emulateButton) {
    return (
      <div className={css(styles.section)} style={{ marginTop: 16 }}>
        <SkeletonTheme
          color={oda.colors.background}
          highlightColor={oda.colors.surface}
          height="83px"
        >
          <Skeleton height="32px" />
        </SkeletonTheme>
      </div>
    );
  }

  if (emulateTextField) {
    return (
      <div className={css(styles.section)} style={{ marginTop: 16 }}>
        <SkeletonTheme
          color={oda.colors.background}
          highlightColor={oda.colors.surface}
          height="83px"
        >
          <Skeleton height="83px" />
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className={css(styles.section)}>
      <SkeletonTheme
        color={oda.colors.background}
        highlightColor={oda.colors.surface}
        height="100%"
      >
        <div
          className={css(
            styles.fieldValue,
            marginTopOnFirst && styles.marginTop16
          )}
        >
          <Skeleton height="100%" />
        </div>
        {secondLine && (
          <div className={css(styles.fieldValue, styles.marginTop16)}>
            <Skeleton height="100%" />
          </div>
        )}
      </SkeletonTheme>
    </div>
  );
};

export default OrderInfoGenericSkeleton;
