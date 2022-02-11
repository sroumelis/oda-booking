import { TextField as MuiTextField } from "@material-ui/core/";
import { withStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";
import oda from '../../../common/theme/oda'
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "../";
import dateButton from "./img/date-button.svg";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: oda.colors.surface,
        boxShadow: oda.boxShadows.normal,
        "& h1,& h2,& h3,& h4,& h5, & h6": {
          color: oda.colors.primary,
        },
      },
    },
    MuiPickersDay: {
      day: {
        color: oda.colors.primary,
      },
      daySelected: {
        backgroundColor: oda.colors.secondary,
        color: oda.colors.surface,
        "&:hover": {
          backgroundColor: oda.colors.disabledLowOpacity,
          color: oda.colors.surface,
        },
      },
      current: {
        color: oda.colors.secondary,
      },
    },
    MuiButton: {
      textPrimary: {
        color: oda.colors.secondary + "!important",
      },
    },
    MuiPickersYear: {
      root: {
        "&:focus": {
          color: oda.colors.secondary + "!important",
        },
      },
      yearSelected: {
        color: oda.colors.secondary + "!important",
      },
    },
  },
});

const DateField = (props) => {
  const { name, error, label, outerClassName, value, hideToday } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const parseDate = (date) => {
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + day;
  };

  return (
    <>
      <div
        className={outerClassName}
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <TextField
          value={parseDate(value)}
          error=""
          name={name}
          label={label}
          outerClassName={css(styles.width100)}
          outerOnClick={() => setIsOpen(true)}
        />
        <img src={dateButton} alt="" onClick={() => setIsOpen(true)} />
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              style={{ display: "none" }}
              open={isOpen}
              value={value}
              onClose={() => setIsOpen(false)}
              {...props}
              onChange={(e) => props?.onChange(e)}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
      {error && <span className={css(styles.errorText)}>{error}</span>}
    </>
  );
};

export default DateField;
