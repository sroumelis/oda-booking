import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";
import { CheckBox } from "../../../CheckBox";
import OrderInfoGenericSkeleton from "../OrderInfoGenericSkeleton/OrderInfoGenericSkeleton";

const Tips = (props) => {
  const { orderInfo, setOrderInfo, isLoading } = props;

  const tipStrings = ["5%", "10%", "15%", "20%"];

  return !isLoading ? (
    <div className={css(styles.section)}>
      {/* <span className={css(styles.smallHeader)}>Tip</span> */}
      <div className={css(styles.flex, styles.gap4)}>
        {tipStrings.map((tip, i) => (
          <CheckBox
            hidePrice
            removePaddingRight
            key={i}
            text={tip}
            smallCheckbox
            checked={orderInfo?.tip === i}
            onChange={() =>
              setOrderInfo({
                ...orderInfo,
                tip: orderInfo?.tip === i ? 'no-tip' : i,
              })
            }
          />
        ))}
      </div>
    </div>
  ) : (
    <OrderInfoGenericSkeleton />
  );
};

export default Tips;
