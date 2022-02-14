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

const ServingPointItem = ({ servicePoint, callBack }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [sPointId, setSpointId] = useState(null);
  const selectedTable = useSelector(bookingSelectors.selectedTable);
  const dispatch = useDispatch();
  const location = useLocation();

  const _selectedTable = (table) => {
    dispatch(bookingActions.selectTable(servicePoint));
    if (callBack) {
      console.log("tableId");
      callBack("tableId", table?.id);
    }
  };

  console.log("itemnmmm");

  return (
    <div
      className={css(
        styles.sPoint,
        selectedTable?.id === servicePoint?.id && styles.selected
      )}
      onClick={() => _selectedTable(servicePoint)}
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
