import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { navigate, useLocation } from "@reach/router";
import { OrderInfo } from "../../../View/pages/DashboardPage/components/OrderInfo";
import styles from "./styles";
import { Navbar } from "../../common/components";
import {
  orderInfoActions,
  orderInfoSelectors,
} from "../../../State/modules/orderInfo";
import { selectedTabSelectors } from "../../../State/modules/selectedTab";
import { basketSelectors, basketActions } from "../../../State/modules/basket";
import { Preferences } from "../Preferences";
import {
  getUserInfo,
  getUserInvoices,
  getUserAddresses,
  getUserCards,
  isLoading,
} from "../../../State/modules/user/userInfo/selectors";
import { authenticationSelectors } from "../../../State/modules/user/authentication";
import {
  storeByIdActions,
  storeByIdSelectors,
} from "../../../State/modules/storeById";
import { UserSettings } from "../../../View/pages/UserSettings";
import { parseAddressObject, getQueryVariable } from "../../../Utils/utilities";
import { catalogSelectors } from "../../../State/modules/catalog/catalog";
const Basket = (props) => {
  const orderInfo = useSelector(orderInfoSelectors.getOrderInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedStoreInfo = useSelector(storeByIdSelectors.getStoreInfo);
  const selectedStore = useSelector(storeByIdSelectors.getStore);
  const userInfo = useSelector(getUserInfo);
  const isStoreInfoLoading = useSelector(storeByIdSelectors.isLoading);
  const isUserInfoLoading = useSelector(isLoading);
  const areCatalogGroupsLoading = useSelector(catalogSelectors.isLoading);
  const basket = useSelector(basketSelectors.getBasket);

  const setBasket = (basket) => {
    dispatch(basketActions.setBasket(basket));
  };
  const isAuthenticated = useSelector(
    authenticationSelectors.getAuthentication
  );
  const isOrderInfoInitialized = useSelector(
    orderInfoSelectors.isOrderInfoInitialized
  );

  const _setOrderInfo = (data) => {
    dispatch(orderInfoActions.setOrderInfo({ ...data }));
  };

  const catalogueBasket = process.env.REACT_APP_RELATIVE_PATH
    ? `/${process.env.REACT_APP_RELATIVE_PATH}/catalogue`
    : "/catalogue";

  useEffect(() => {
    // initializing the order address/payment method when user data is loaded
    if (
      !userInfo ||
      !Object.keys(userInfo).length ||
      !selectedStoreInfo ||
      !Object.keys(selectedStoreInfo)
    ) {
      // if we dont have user info OR store info, we redirect to the dashboard page

      navigate(catalogueBasket, {
        state: {},
      });
      // navigate("/catalogue", {
      //   state: {
      //     comesFromBasketMobile: true,
      //   },
      // });
    }
  }, [userInfo]);

  return (
    <>
      <div className={css(styles.container)}>
        <Navbar
          title="My Order"
          onClose={() =>
            navigate(catalogueBasket, {
              state: {
                comesFromBasketMobile: true,
              },
            })
          }
        />
        <div className={css(styles.content)}>
          <OrderInfo
            actAsModal
            orderInfo={orderInfo}
            setOrderInfo={_setOrderInfo}
            isFromBasket
            basket={basket}
            setBasket={setBasket}
            isLoading={
              isStoreInfoLoading || isUserInfoLoading || areCatalogGroupsLoading
            }
          />
          <UserSettings
            path={location.pathname}
            setOrderInfo={_setOrderInfo}
            orderInfo={orderInfo}
          />
        </div>
      </div>
      <Preferences
        path={location.pathname}
        basket={basket}
        setBasket={setBasket}
        isStoreClosed={!selectedStore.enabled}
      />
    </>
  );
};

const memoizedBasket = React.memo(Basket);
export { memoizedBasket as Basket };
