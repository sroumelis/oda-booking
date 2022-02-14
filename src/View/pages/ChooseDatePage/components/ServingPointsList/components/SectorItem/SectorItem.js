import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { navigate, useLocation, Router } from "@reach/router";

import { ServingPointItem } from "..";

import styles from "./styles";

const SectorItem = ({ sector, callBack }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const _toggleExpand = () => {
    setExpand(!expand);
  };
  console.log(sector);
  return (
    <>
      <div className={css(styles.sector)} onClick={_toggleExpand}>
        <div>{sector?.name}</div>
        <div>expand</div>
      </div>
      {expand &&
        sector?.subSectors?.map((subSector) => {
          return (
            <div style={{ paddingLeft: 10 }}>
              <SectorItem
                key={subSector?.id}
                sector={subSector}
                callBack={callBack}
              />
            </div>
          );
        })}
      {expand &&
        sector?.servicePoints?.map((servicePoint) => {
          return (
            <div style={{ paddingLeft: 10 }}>
              <ServingPointItem
                servicePoint={{ ...servicePoint, sectorName: sector?.name }}
                callBack={callBack}
              />
            </div>
          );
        })}
    </>
  );
};

const memoizedSectorItem = React.memo(SectorItem);
export { memoizedSectorItem as SectorItem };
