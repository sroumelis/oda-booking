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
  const { storeInfo, callback } = props;
  const [selectedTime, setSelectedTime] = React.useState(null);
  const handleTimeChange = (timeSlot) => {
    setSelectedTime(timeSlot);
    if (callback) {
      callback("timeSlot", timeSlot);
    }
  };

  const hours = {
    morning: ["00:30", "13:00", "13:30", "14:00", "15:30", "16:30"],
    evening: ["00:30", "13:00", "13:30", "14:00", "15:30", "16:30"],
    night: ["00:30", "13:00", "13:30", "14:00", "15:30", "16:30"],
  };

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
        {hours?.morning?.length > 0 && (
          <>
            <div className={css(styles.title)}>Morning</div>
            <div className={css(styles.timeContainer)}>
              {hours?.morning?.map((hour, index) => {
                return (
                  <Button
                    key={index + ";Morning"}
                    style={{
                      backgroundColor:
                        selectedTime === index + ";Morning"
                          ? "#253141"
                          : "#e0e0e0",
                      color:
                        selectedTime === index + ";Morning" ? "white" : "black",
                    }}
                    onClick={() => {
                      handleTimeChange(index + ";Morning");
                    }}
                  >
                    00:30
                  </Button>
                );
              })}
            </div>
          </>
        )}
        {hours?.evening?.length > 0 && (
          <>
            <div className={css(styles.title)}>Evening</div>
            <div className={css(styles.timeContainer)}>
              {hours?.evening?.map((hour, index) => {
                return (
                  <Button
                    key={index + ";Evening"}
                    style={{
                      backgroundColor:
                        selectedTime === index + ";Evening"
                          ? "#253141"
                          : "#e0e0e0",
                      color:
                        selectedTime === index + ";Evening" ? "white" : "black",
                    }}
                    onClick={() => {
                      handleTimeChange(index + ";Evening");
                    }}
                  >
                    00:30
                  </Button>
                );
              })}
            </div>
          </>
        )}
        {hours?.night?.length > 0 && (
          <>
            <div className={css(styles.title)}>Night</div>
            <div className={css(styles.timeContainer)}>
              {hours?.night?.map((hour, index) => {
                return (
                  <Button
                    key={index + ";Night"}
                    style={{
                      backgroundColor:
                        selectedTime === index + ";Night"
                          ? "#253141"
                          : "#e0e0e0",
                      color:
                        selectedTime === index + ";Night" ? "white" : "black",
                    }}
                    onClick={() => {
                      handleTimeChange(index + ";Night");
                    }}
                  >
                    00:30
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
