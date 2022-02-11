import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { useSelector, useDispatch } from "react-redux";
import validation from "./validation";
import { TextField, Button } from "../../../../../../common/components";
import { addPaymentMethod } from "../../../../../../../State/modules/paymentMethod/add/actions";
import { fetchUserInfo } from "../../../../../../../State/modules/user/userInfo/actions";
import { setLoader } from "../../../../../../../State/modules/globalLoader/actions";
import { setModal } from "../../../../../../../State/modules/confirmationModal/actions";
import { Form, Formik } from "formik";

const CreateCardForm = (props) => {
  const dispatch = useDispatch();
  const { setIsCreatingCard } = props;
  const cardForm = {
    cardHolderName: "",
    cardNumber: "",
    expirationMonth: null,
    expirationYear: null,
    ccv: null,
  };

  const _addPaymentMethod = async (data) => {
    const expirationDate = new Date();
    expirationDate.setMonth(data?.expirationMonth - 1);
    expirationDate.setFullYear("20" + (data?.expirationYear + ""));
    try {
      dispatch(setLoader(true));
      const response = await dispatch(
        addPaymentMethod({
          paymentMethod: {
            cardHolderName: data?.cardHolderName || "",
            cardNumber: data?.cardNumber || "",
            expiration: expirationDate.toISOString(),
            cvv: data?.ccv + "" || "",
          },
        })
      );
      await dispatch(fetchUserInfo(true));
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content:
            "Card created succesfully!",
          title: "Success",
        })
      );
      setIsCreatingCard(false);
    } catch (e) {
      console.log(e);
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content:
            "There was a problem with creating the new card. Please try again",
          title: "Error",
        })
      );
    } finally {
      dispatch(setLoader(false));
    }
    // setLoader
    // addPaymentMethod
  };

  return (
    <div className={css(styles.fullHeight)}>
      <Formik
        initialValues={cardForm}
        validationSchema={validation}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          _addPaymentMethod(values);
        }}
        render={({ values, handleChange, errors }) => (
          <Form className={css(styles.form)}>
            <div>
              <span className={css(styles.instructionsText)}>
                Add new Card
              </span>
              <div className={css(styles.normalRow)}>
                <TextField
                  value={values?.cardHolderName}
                  onChange={handleChange}
                  name="cardHolderName"
                  outerClassName={css(styles.textField)}
                  label="Card Holder Name"
                  error={errors?.cardHolderName || false}
                />
              </div>
              <div className={css(styles.normalRow)}>
                <TextField
                  value={values?.cardNumber}
                  onChange={handleChange}
                  name="cardNumber"
                  outerClassName={css(styles.textField)}
                  label="Card Number"
                  error={errors?.cardNumber || false}
                />
              </div>
              <div className={css(styles.twoInputsRow)}>
                <TextField
                  value={values?.expirationMonth}
                  onChange={handleChange}
                  name="expirationMonth"
                  outerClassName={css(styles.textField)}
                  label="Expiration Month"
                  type="number"
                  error={errors?.expirationMonth || false}
                />
                <TextField
                  value={values?.expirationYear}
                  onChange={handleChange}
                  name="expirationYear"
                  type="number"
                  outerClassName={css(styles.textField)}
                  label="Expiration Year"
                  error={errors?.expirationYear || false}
                />
              </div>
              <div className={css(styles.twoInputsRow)}>
                <TextField
                  value={values?.ccv}
                  onChange={handleChange}
                  name="ccv"
                  type="number"
                  outerClassName={css(styles.textField)}
                  label="CCV"
                  error={errors?.ccv || false}
                />
                <div />
              </div>
            </div>
            <div className={css(styles.twoButtons)}>
              <Button onClick={() => setIsCreatingCard(false)} type="button">
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

const memoizedCreateCardForm = React.memo(CreateCardForm);
export { memoizedCreateCardForm as CreateCardForm };
