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
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const ThankyouPage = ({ loading, complete, message }) => {
  return (
    <div className={css(styles.footerContainer)}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: 200,
        }}
      >
        {loading && !complete && <CircularProgress />}
        {!loading && complete && (
          <>
            <div className={css(styles.title)}>Thank you for your time!</div>

            <div className={css(styles.textContent)}>
              Uppon 3 months we will send you an email to complete your book
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThankyouPage;
