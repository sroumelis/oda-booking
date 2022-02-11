import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import oda from "../../../../../../common/theme/oda";
import { CheckBox } from "../../../CheckBox";
import { hideCardNumbers } from "../../../../../../../Utils/utilities";
import rightArrow from "../../img/right-arrow.svg";
import { Container } from "../../../../../../common/components/";
import contactless from "../../../../../../common/img/contactless-delivery.png";
import cashOnDelivery from "../../../../../../common/img/cash-on-delivery.svg";
import cardOnDelivery from "../../../../../../common/img/credit-card.png";
import OrderInfoGenericSkeleton from "../OrderInfoGenericSkeleton/OrderInfoGenericSkeleton";

const PaymentSection = (props) => {
  const { orderInfo, openPaymentsModal, cardTypes, isLoading } = props;
  let hasSelectedMethod =
    orderInfo?.paymentMethod === 1 ||
    orderInfo?.paymentMethod === 2 ||
    orderInfo?.paymentMethod === 3;
  const cardImages = ["", cashOnDelivery, contactless, cardOnDelivery];
  return (
    <div className={css(styles.section)} onClick={openPaymentsModal}>
      {!isLoading ? (
        <div className={css(styles.flex)}>
          <>
            {
              <>
                {hasSelectedMethod && (
                  <img
                    className={css(styles.cardImage)}
                    src={cardImages[orderInfo?.paymentMethod]}
                    alt=""
                  />
                )}
                <span
                  className={css(
                    hasSelectedMethod && styles.fieldValue,
                    !hasSelectedMethod && styles.disabledText
                  )}
                >
                  {hasSelectedMethod
                    ? cardTypes?.[orderInfo?.paymentMethod]
                    : "Press here to select a payment method"}
                </span>
              </>
            }
            <img src={rightArrow} alt="" />
          </>
        </div>
      ) : (
        <OrderInfoGenericSkeleton />
      )}
    </div>
  );
};

export default PaymentSection;
