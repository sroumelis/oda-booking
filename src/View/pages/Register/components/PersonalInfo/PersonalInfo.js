import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { TextField, Button } from "../../../../common/components";
import { ProfileInfoForm, ReceiptsForm, InvoicesForm } from "./components";
import { Wrapper } from "../";
import { Field, Form, Formik } from "formik";
import validation from "./validation";

const PersonalInfo = (props) => {
  const {
    activeStep,
    setActiveStep,
    personalInfo,
    setPersonalInfo,
    userRegister,
    prediction,
  } = props;
  return (
    <>
      <div>
        <Formik
          initialValues={personalInfo}
          onSubmit={(values, actions) =>
            setTimeout(() => {
              setPersonalInfo(values);
              // setActiveStep(activeStep + 1);
              userRegister(values);
            }, 500)
          }
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validation}
          render={({ values, handleChange, errors, setFieldValue }) => (
            <Form>
              <ProfileInfoForm
                values={values}
                handleChange={handleChange}
                errors={errors}
                setFieldValue={setFieldValue}
              />
              <ReceiptsForm
                values={values}
                handleChange={handleChange}
                errors={errors}
                setFieldValue={setFieldValue}
                prediction={prediction}
              />
              {/* <InvoicesForm
                values={values}
                handleChange={handleChange}
                errors={errors}
              /> */}
              <Wrapper
                hasMarginTop
                hideShadowOnResponsive
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  className={css(styles.button)}
                  type="button"
                  onClick={() => {
                    setPersonalInfo(values);
                    setActiveStep(activeStep - 1);
                  }}
                >
                  Back
                </Button>
                <Button className={css(styles.button)} type="submit">
                  Submit
                </Button>
              </Wrapper>
            </Form>
          )}
        />
      </div>
    </>
  );
};

export default PersonalInfo;
