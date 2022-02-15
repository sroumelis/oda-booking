import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { navigate, useLocation, Router } from "@reach/router";
import { useForm } from "react-hook-form";
// import TextField from "@material-ui/core/TextField";
import { TextField } from "../../../../common/components";

import styles from "./styles";

import { formatMoney, safeRound } from "../../../../../Utils/utilities";

import {
  bookingActions,
  bookingSelectors,
} from "../../../../../State/modules/booking";

const Review = ({ callback }) => {
  const [phoneValue, setPhoneValue] = useState("");
  const selectedTable = useSelector(bookingSelectors.selectedTable);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const _onBlur = (property, value) => {
    console.log(value);
    if (property) {
      setPhoneValue(value);
    }
    if (callback) {
      callback(property, value);
    }
  };

  return (
    <>
      <div className={css(styles.sPoint, styles.selected)}>
        <div className={css(styles.row)}>
          <div>{selectedTable?.name}</div>
          <div>
            {formatMoney(safeRound(selectedTable?.minConsumption, 2), 2)}
          </div>
        </div>
        <div className={css(styles.row)}>
          <div>{`${selectedTable?.capacity} ${
            selectedTable?.capacity === 1 ? "Guest" : "Guests"
          }`}</div>
          <div>Minimum consumption</div>
        </div>
      </div>
      <div style={{ marginTop: 0 }}>
        <form noValidate>
          <div style={{ marginTop: 16 }}>
            <TextField
              id="name"
              label="Name"
              onChange={(e) => _onBlur("userName", e?.target?.value)}
              autoComplete="name"
              inputProps={{
                autoComplete: "off",
              }}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <TextField
              id="email"
              label="E-mail"
              type={"email"}
              onChange={(e) => _onBlur("email", e?.target?.value)}
              autoComplete="email"
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <TextField
              id="phone"
              label="Mobile phone"
              type={"phone"}
              value={phoneValue}
              onChange={(e) => {
                console.log("phone");
                let value = e?.target?.value;
                const re = /^[0-9\b]+$/;
                if (value?.length >= 13) {
                  value = value.slice(0, value.length - 1);
                }
                if (re.test(value) || !value) {
                  _onBlur("phone", value);
                }
              }}
              autoComplete="phone"
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <TextField
              placeholder="Write any comments or special request here"
              id="outlined-basic"
              label="Comments"
              multiline
              rows={3}
              maxRows={5}
              onChange={(e) => _onBlur("comments", e?.target?.value)}
              autoComplete="new-password"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Review;
