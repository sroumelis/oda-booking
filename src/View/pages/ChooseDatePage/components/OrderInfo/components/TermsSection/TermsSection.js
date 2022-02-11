import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";
import { CheckBox } from "../../../CheckBox";
import { parseAddressObject } from "../../../../../../../Utils/utilities";
import rightArrow from "../../img/right-arrow.svg";
import OrderInfoGenericSkeleton from "../OrderInfoGenericSkeleton/OrderInfoGenericSkeleton";
const TermsSection = (props) => {
  const { orderInfo, setOrderInfo, isLoading, isPayingWithCard, isDelivery } =
    props;

  return !isLoading ? (
    <div className={css(styles.section)}>
      {/* Contactless delivery only if we're talking about a delivery and the user can pay by card before */}
      {isPayingWithCard && isDelivery && (
        <CheckBox
          hidePrice
          removePaddingRight
          text="Contactless delivery"
          checked={orderInfo?.contactless}
          onChange={() =>
            setOrderInfo({
              ...orderInfo,
              contactless: !orderInfo?.contactless,
            })
          }
        />
      )}
      <CheckBox
        hidePrice
        removePaddingRight
        text="Notify me about my order's progress"
        checked={orderInfo?.deliveryUpdates}
        onChange={() =>
          setOrderInfo({
            ...orderInfo,
            deliveryUpdates: !orderInfo?.deliveryUpdates,
          })
        }
      />
    </div>
  ) : (
    <OrderInfoGenericSkeleton secondLine marginTopOnFirst />
  );
};

export default TermsSection;
