import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import logo from "../../../../common/img/no-image-available.jpg";
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

const DatePicker = (props) => {
  const { storeInfo, callback } = props;
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (callback) {
      callback("date", date);
    }
  };

  const _disableWeekends = (date) => {
    console.log("DATE_");
    return date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className={css(styles.footerContainer)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="static"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          shouldDisableDate={_disableWeekends}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          minDate={new Date()}
          // maxDate={new Date()}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
