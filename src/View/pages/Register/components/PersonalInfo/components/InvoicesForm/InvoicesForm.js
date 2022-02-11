import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Checkbox as CustomCheckbox } from "@material-ui/core";
import { FieldArray } from "formik";
import { TextField, Button } from "../../../../../../common/components";
import { Wrapper } from "../../../";

const InvoicesForm = (props) => {
  const { values, errors, handleChange } = props;

  const invoiceObject = {
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    floor: "",
    vat: "",
    doy: "",
    phone: "",
    comment: "",
  };
  return (
    <FieldArray
      name="invoices"
      render={(arrayHelpers) => (
        <div>
          {values.invoices.map((invoice, index) => {
            return (
              <Wrapper
              useSpecialHeader
                hasMarginTop
                key={index}
                header={"Invoice " + (index + 1)}
              >
                <TextField
                  value={invoice?.companyName}
                  onChange={handleChange}
                  name={`invoices.${index}.companyName`}
                  outerClassName={css(styles.textField)}
                  label="Company Name"
                  error={errors?.invoices?.[index]?.companyName || false}
                />
                <TextField
                  value={invoice?.address}
                  onChange={handleChange}
                  name={`invoices.${index}.address`}
                  outerClassName={css(styles.textField)}
                  label="Address"
                  error={errors?.invoices?.[index]?.address || false}
                />
                <div className={css(styles.twoFieldsRow)}>
                  <TextField
                    value={invoice?.city}
                    onChange={handleChange}
                    name={`invoices.${index}.city`}
                    outerClassName={css(styles.textField)}
                    label="City"
                    error={errors?.invoices?.[index]?.city || false}
                  />
                  <TextField
                    value={invoice?.state}
                    onChange={handleChange}
                    name={`invoices.${index}.state`}
                    outerClassName={css(styles.textField)}
                    label="State"
                    error={errors?.invoices?.[index]?.state || false}
                  />
                </div>
                <div className={css(styles.twoFieldsRow)}>
                  <TextField
                    value={invoice?.zipCode}
                    onChange={handleChange}
                    name={`invoices.${index}.zipCode`}
                    outerClassName={css(styles.textField)}
                    label="Zip Code"
                    error={errors?.invoices?.[index]?.zipCode || false}
                  />
                  <TextField
                    value={invoice?.floor}
                    onChange={handleChange}
                    name={`invoices.${index}.floor`}
                    outerClassName={css(styles.textField)}
                    label="Floor"
                    error={errors?.invoices?.[index]?.floor || false}
                  />
                </div>
                <div className={css(styles.twoFieldsRow)}>
                  <TextField
                    value={invoice?.vat}
                    onChange={handleChange}
                    name={`invoices.${index}.vat`}
                    outerClassName={css(styles.textField)}
                    label="V.A.T"
                    error={errors?.invoices?.[index]?.vat || false}
                  />
                  <TextField
                    value={invoice?.doy}
                    onChange={handleChange}
                    name={`invoices.${index}.doy`}
                    outerClassName={css(styles.textField)}
                    label="DOY"
                    error={errors?.invoices?.[index]?.doy || false}
                  />
                </div>
                <TextField
                  value={invoice?.phone}
                  onChange={handleChange}
                  name={`invoices.${index}.phone`}
                  outerClassName={css(styles.textField)}
                  label="Phone"
                  error={errors?.invoices?.[index]?.phone || false}
                />
                <TextField
                  value={invoice?.comment}
                  onChange={handleChange}
                  name={`invoices.${index}.comment`}
                  outerClassName={css(styles.textField)}
                  label="Comment"
                  error={errors?.invoices?.[index]?.comment || false}
                />
                <div className={css(styles.quantityButtonsFlex)}>
                  {values?.invoices?.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className={css(styles.quantityButton)}
                    >
                      -
                    </Button>
                  )}
                  {values?.invoices?.length - 1 === index && (
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push(invoiceObject)} // insert an empty string at a position
                      className={css(styles.quantityButton)}
                    >
                      +
                    </Button>
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

const memoizedInvoicesForm = React.memo(InvoicesForm);
export { memoizedInvoicesForm as InvoicesForm };
