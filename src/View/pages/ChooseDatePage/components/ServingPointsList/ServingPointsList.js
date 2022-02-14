import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";

import styles from "./styles";
import { StyleSheet, css } from "aphrodite";

import { ServingPointItem, SectorItem } from "./components";
import data from "./data";

const ServingPointsList = (props) => {
  const { storeInfo, callBack } = props;
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [expand, setExpand] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const _toggleExpand = () => {
    setExpand(!expand);
  };
  return (
    <div className={css(styles.bookListontainer)}>
      {data?.map((item) => {
        return <SectorItem key={item?.id} sector={item} callBack={callBack} />;
      })}
    </div>
  );
};

export default ServingPointsList;
