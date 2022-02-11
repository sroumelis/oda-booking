import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { navigate } from "@reach/router";

import styles from "./styles";

import {
  catalogActions,
  catalogSelectors,
} from "../../../State/modules/catalog/catalog";

const StoreDetails = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const _redirectToLogin = async () => {
    try {
      console.log("fetch");
      const data = {
        StoreId: "5CDA86A1-4CB6-4EBE-B879-3203A68E89BF",
        CatalogName: "oda Catalog",
        Hash: "3AE025E89A21CEC3A81CB082FCC8B49D",
      };
      const catalog = await dispatch(catalogActions.fetchCatalog(data));
      console.log(catalog);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={css(styles.button)}>{"StoreDetails"}</div>
    </>
  );
};

const memoizedStoreDetails = React.memo(StoreDetails);
export { memoizedStoreDetails as StoreDetails };
