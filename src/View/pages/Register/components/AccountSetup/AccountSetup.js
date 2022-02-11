import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { TextField, Button } from "../../../../common/components";
import { checkIfUserExists } from "../../../../../State/modules/user/checkUserEmail/actions";
import { setLoader } from "../../../../../State/modules/globalLoader/actions";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../";
import {
  Field,
  Form,
  Formik,
  useFormik,
  FieldArray,
  FormikProps,
} from "formik";
import validation from "./validation";

const AccountSetup = (props) => {
  const { accountSetup, setAccountSetup, setActiveStep } = props;
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={accountSetup}
      validationSchema={validation}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setErrors, resetForm }) => {
        setAccountSetup(values);
        dispatch(setLoader(true));
        let data;
        try {
          data = await dispatch(checkIfUserExists(values.email));
          setActiveStep(1);
        } catch (e) {
          console.log(e);
          setErrors({
            email: "This e-mail address is already in use",
          });
        } finally {
          console.log(data);
          console.log(values);
          dispatch(setLoader(false));
        }
      }}
      render={({ values, handleChange, errors, setFieldValue }) => (
        <Form>
          <Wrapper useSpecialHeader header="Account Setup">
            <TextField
              value={values?.email}
              onChange={handleChange}
              setFieldValue={setFieldValue}
              name={"email"}
              // outerClassName={css(styles.textField)}
              label="email"
              error={errors?.email || false}
            />
            <TextField
              value={values?.password}
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              outerClassName={css(styles.textField)}
              error={errors?.password || false}
            />
            <TextField
              value={values?.passwordConfirmation}
              onChange={handleChange}
              name="passwordConfirmation"
              label="Password Confirmation"
              type="password"
              outerClassName={css(styles.textField)}
              error={errors?.passwordConfirmation || false}
            />
          </Wrapper>
          <Wrapper
            hasMarginTop
            hideShadowOnResponsive
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button className={css(styles.button)} type="submit">
              Next
            </Button>
          </Wrapper>
        </Form>
      )}
    />
  );
};

export default AccountSetup;
