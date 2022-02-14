import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { navigate, useLocation, Router } from "@reach/router";

import styles from "./styles";

import { formatMoney, safeRound } from "../../../../../../../Utils/utilities";

import {
  bookingActions,
  bookingSelectors,
} from "../../../../../../../State/modules/booking";

const ServingPointItem = ({ servicePoint }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [sPointId, setSpointId] = useState(null);
  const selectedTable = useSelector(bookingSelectors.selectedTable);
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedProduct = (groupId, productId) => {
    let state = { groupId, productId };
    console.log(state);
    console.log(navigate);
    navigate(location.pathname, { state });
  };

  const selectedCard = (cardId) => {
    let state = { cardId };
    console.log(state);
    console.log(navigate);
    navigate(location.pathname, { state });
  };

  console.log("itemnmmm");

  return (
    <div
      className={css(
        styles.sPoint,
        selectedTable?.id === servicePoint?.id && styles.selected
      )}
      onClick={() => dispatch(bookingActions.selectTable(servicePoint))}
    >
      <div className={css(styles.row)}>
        <div>{servicePoint?.name}</div>
        <div>{formatMoney(safeRound(servicePoint?.minConsumption, 2), 2)}</div>
      </div>
      <div className={css(styles.row)}>
        <div>{`${servicePoint?.capacity} ${
          servicePoint?.capacity === 1 ? "Guest" : "Guests"
        }`}</div>
        <div>Minimum consumption</div>
      </div>
    </div>
  );
};

const memoizedServingPointItem = React.memo(ServingPointItem);
export { memoizedServingPointItem as ServingPointItem };
