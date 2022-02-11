import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import logo from "../../../../common/img/no-image-available.jpg";
import { Button } from "../../../../common/components/Button";
import facebook from "./img/facebook.svg";
import instagram from "./img/instagram.svg";
import twitter from "./img/twitter.svg";
import tripadvisor from "./img/tripadvisor.svg";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const TimePicker = (props) => {
  const { storeInfo } = props;
  const [selectedTime, setSelectedTime] = React.useState(null);
  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  const hours = [
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
    "00:30",
  ];

  return (
    <div className={css(styles.footerContainer)}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={css(styles.title)}>Evening</div>
        <div className={css(styles.timeContainer)}>
          {hours?.map((hour, index) => {
            return (
              <Button
                key={index + "adsasd"}
                style={{
                  backgroundColor:
                    selectedTime === index ? "#253141" : "#e0e0e0",
                  color: selectedTime === index ? "white" : "black",
                }}
                onClick={() => {
                  handleTimeChange(index);
                }}
              >
                00:30
              </Button>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={css(styles.title)}>Night</div>
        <div className={css(styles.timeContainer)}>
          {hours?.map((hour, index) => {
            return (
              <Button
                key={index + "adsasd"}
                style={{
                  backgroundColor:
                    selectedTime === index ? "#253141" : "#e0e0e0",
                  color: selectedTime === index ? "white" : "black",
                }}
                onClick={() => {
                  handleTimeChange(index);
                }}
              >
                00:30
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
