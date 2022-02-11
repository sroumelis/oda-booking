import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { TextField, ProfilePicture } from "../../../../../../common/components";
import { selectedTabSelectors } from "../../../../../../../State/modules/selectedTab";
import { getStoreInfo } from "../../../../../../../State/modules/storeById/selectors";
import oda from "../../../../../../common/theme/oda";
import { CheckBox } from "../../../CheckBox";
import { parseAddressObject } from "../../../../../../../Utils/utilities";
import noImage from "../../../../../../common/img/no-image-available.jpg";
import rightArrow from "../../img/right-arrow.svg";
import { Container } from "../../../../../../common/components/";
import OrderInfoGenericSkeleton from "../OrderInfoGenericSkeleton/OrderInfoGenericSkeleton";

const AddressSection = (props) => {
  const { isLoading } = props;
  const selectedTab = useSelector(selectedTabSelectors.getSelectedTab);
  const storeInfo = useSelector(getStoreInfo);
  const {
    orderInfo,
    openAddressesModal,
    addressComments,
    setOrderInfo,
    setAddressComments,
    isFromBasket,
  } = props;

  const _openAddressesModal = () => {
    if (!orderInfo?.deliverInStore) {
      openAddressesModal();
    }
  };

  const _openGoogleMapsQuery = () => {
    window.open(
      `https://www.google.com/maps/search/${
        (storeInfo?.name || "") +
        " " +
        (orderInfo?.deliveryAddress?.parsedAddress || "")
      }`,
      "_blank"
    );
  };
  return (
    <Container
      header={
        selectedTab === "Delivery" ? "Delivery Address" : "Collection Point"
      }
    >
      {!isLoading ? (
        <div className={css(styles.section)}>
          {selectedTab === "Delivery" ? (
            <>
              <div
                onClick={_openAddressesModal}
                className={css(
                  styles.flex,
                  orderInfo?.deliveryAddress && styles.paddingBottom24
                )}
              >
                {orderInfo?.deliveryAddress ? (
                  <span className={css(styles.fieldValue)}>
                    {/* {parseAddressObject(orderInfo?.deliveryAddress)} */}
                    {orderInfo?.deliveryAddress?.parsedAddress || ""}
                  </span>
                ) : (
                  <span className={css(styles.disabledText)}>
                    Press here to select an address
                  </span>
                )}
                <img
                  src={rightArrow}
                  alt=""
                  style={{ opacity: !orderInfo?.deliverInStore ? 1 : 0 }}
                />
              </div>
            </>
          ) : (
            <>
              <div onClick={_openGoogleMapsQuery} className={css(styles.flex)}>
                <div className={css(styles.grid)}>
                  <ProfilePicture
                    smallPicture
                    selectedImage={storeInfo?.logo || noImage}
                    disableChange
                    disableMarginBottom
                  />
                  <span
                    className={css(
                      styles.fieldValue,
                      isFromBasket && styles.putLeft
                    )}
                  >
                    {orderInfo?.deliveryAddress?.parsedAddress || ""}
                  </span>
                </div>
                <img src={rightArrow} alt="" />
              </div>
            </>
          )}
        </div>
      ) : (
        <OrderInfoGenericSkeleton />
      )}
      {!isLoading &&
        orderInfo?.deliveryAddress &&
        selectedTab === "Delivery" && (
          <TextField
            label="Address comments"
            className={css(styles.commentsField)}
            value={addressComments}
            onBlur={() =>
              setOrderInfo({ ...orderInfo, addressComments: addressComments })
            }
            onChange={(e) => setAddressComments(e.target.value)}
            multiline
            rows={3}
          />
        )}
    </Container>
  );
};

export default AddressSection;
