import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import { FieldArray } from "formik";
import { TextField, TextButton, Button } from "../../../../../../common/components";
import {
  locationQuery,
  searchLocation,
} from "../../../../../../../Utils/utilities";
import { Wrapper } from "../../../";
import CloseButton from "../../../../../../common/img/close-white.svg";

const ReceiptsForm = (props) => {
  const { values, errors, handleChange, setFieldValue } = props;
  const [predictions, setPredictions] = React.useState([
    {
      address: [],
      city: [],
      state: [],
      zipCode: [],
    },
  ]);
  const receiptObject = {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    floor: "",
    comment: "",
  };

  const handlePredictionSelection = async (index, e) => {
    const predictionsObj = await locationQuery(e);
    const arr = [...predictions];
    arr[index] = predictionsObj;
    setPredictions(arr);
  };

  const removePredictionsObj = (index) => {
    let arr = [...predictions];
    arr.splice(index, 1);
    setPredictions(arr);
  };

  return (
    <FieldArray
      name="receipts"
      render={(arrayHelpers) => (
        <div>
          {values.receipts.map((receipt, index) => {
            return (
              <Wrapper
                useSpecialHeader
                hasMarginTop
                key={index}
                style={styles.positionRelative._definition}
                header={"Delivery Address " + (index + 1)}
              >
                <form autocomplete="off">
                  <TextField
                    value={receipt?.address}
                    onChange={(e) => {
                      handleChange(e);
                      handlePredictionSelection(index, e.target.value);
                    }}
                    setFieldValue={setFieldValue}
                    name={`receipts.${index}.address`}
                    // outerClassName={css(styles.textField)}
                    predictions={predictions?.[index]?.address}
                    label="Address"
                    error={errors?.receipts?.[index]?.address || false}
                  />
                </form>
                <div className={css(styles.twoFieldsRow)}>
                  <form autocomplete="off">
                    <TextField
                      value={receipt?.city}
                      onChange={handleChange}
                      name={`receipts.${index}.city`}
                      setFieldValue={setFieldValue}
                      outerClassName={css(styles.textField)}
                      label="City"
                      predictions={predictions?.[index]?.city}
                      error={errors?.receipts?.[index]?.city || false}
                    />
                  </form>
                  <form autocomplete="off">
                    <TextField
                      value={receipt?.state}
                      onChange={handleChange}
                      name={`receipts.${index}.state`}
                      setFieldValue={setFieldValue}
                      outerClassName={css(styles.textField)}
                      label="State"
                      predictions={predictions?.[index]?.state}
                      error={errors?.receipts?.[index]?.state || false}
                    />
                  </form>
                </div>
                <div className={css(styles.twoFieldsRow)}>
                  <form autocomplete="off">
                    <TextField
                      value={receipt?.zipCode}
                      onChange={handleChange}
                      setFieldValue={setFieldValue}
                      name={`receipts.${index}.zipCode`}
                      outerClassName={css(styles.textField)}
                      label="Zip Code"
                      predictions={predictions?.[index]?.zipCode}
                      error={errors?.receipts?.[index]?.zipCode || false}
                    />
                  </form>
                  <TextField
                    value={receipt?.floor}
                    onChange={handleChange}
                    name={`receipts.${index}.floor`}
                    outerClassName={css(styles.textField)}
                    label="Floor"
                    error={errors?.receipts?.[index]?.floor || false}
                  />
                </div>
                <TextField
                  value={receipt?.comment}
                  onChange={handleChange}
                  name={`receipts.${index}.comment`}
                  outerClassName={css(styles.textField)}
                  label="Comment"
                  error={errors?.receipts?.[index]?.comment || false}
                />
                {values?.receipts?.length > 1 && (
                  <img
                    onClick={() => {
                      removePredictionsObj(index);
                      arrayHelpers.remove(index);
                    }}
                    src={CloseButton}
                    alt=""
                    className={css(styles.removeFormButton)}
                  />
                )}
                <div className={css(styles.quantityButtonsFlex)}>
                  {values?.receipts?.length - 1 === index && (
                    // <Button
                    //   type="button"
                    //   onClick={() => arrayHelpers.push(receiptObject)} // insert an empty string at a position
                    //   className={css(styles.quantityButton)}
                    // >
                    //   +
                    // </Button>
                    <TextButton
                      onClick={() => arrayHelpers.push(receiptObject)} // insert an empty string at a position
                    >
                      Add address
                    </TextButton>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      )}
    />
  );
};

const memoizedReceiptsForm = React.memo(ReceiptsForm);
export { memoizedReceiptsForm as ReceiptsForm };
