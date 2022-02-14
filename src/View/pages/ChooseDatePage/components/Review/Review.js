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
  const selectedTable = useSelector(bookingSelectors.selectedTable);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const _onBlur = (propery, value) => {
    console.log(value);
    if (callback) {
      callback(propery, value);
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
        <form>
          <div style={{ marginTop: 16 }}>
            <TextField
              id="outlined-basic"
              label="Name"
              onBlur={(e) => _onBlur("userName", e?.target?.value)}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <TextField
              id="outlined-basic"
              label="E-mail"
              type={"email"}
              onBlur={(e) => _onBlur("email", e?.target?.value)}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <TextField
              id="outlined-basic"
              label="Mobile phone"
              type={"phone"}
              onBlur={(e) => _onBlur("phone", e?.target?.value)}
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
              onBlur={(e) => _onBlur("comments", e?.target?.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Review;
