import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import {
  TextField,
  Button,
  DateField,
  ProfilePicture,
} from "../../../../../../common/components";
import { Wrapper } from "../../../";
import {
  Field,
  Form,
  Formik,
  useFormik,
  FieldArray,
  FormikProps,
} from "formik";

const ProfileInfoForm = (props) => {
  const { values, handleChange, errors, setFieldValue } = props;

  return (
    <Wrapper useSpecialHeader header="Personal Info">
      <ProfilePicture
        selectedImage={values?.profilePictureBase64}
        name="profilePictureBase64"
        onChange={(e) => {
          if (e?.target?.files?.[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setFieldValue("profilePictureName", e.target.files[0].name);
            reader.onload = () => {
              setFieldValue("profilePictureBase64", reader.result);
            };
          }
        }}
      />
      {errors?.profilePictureBase64 && (
        <span className={css(styles.errorText)}>
          {errors?.profilePictureBase64}
        </span>
      )}
      <TextField
        value={values?.firstname}
        onChange={handleChange}
        name={"firstname"}
        outerClassName={css(styles.textField)}
        label="First Name"
        error={errors?.firstname || false}
      />
      <TextField
        value={values?.lastname}
        onChange={handleChange}
        name={"lastname"}
        label="Last Name"
        outerClassName={css(styles.textField)}
        error={errors?.lastname || false}
      />
      <TextField
        value={values?.mobile}
        onChange={handleChange}
        name="mobile"
        label="Mobile"
        outerClassName={css(styles.textField)}
        error={errors?.mobile || false}
      />
      {/* <DateField
        value={values?.birthdate}
        disableFuture
        onChange={(e) => {
          setFieldValue("birthdate", new Date(e));
        }}
        name={"birthdate"}
        label="Date of birth"
        outerClassName={css(styles.textField)}
        type={"date"}
        error={errors?.birthdate || false}
      /> */}
    </Wrapper>
  );
};

const memoizedProfileInfoForm = React.memo(ProfileInfoForm);
export { memoizedProfileInfoForm as ProfileInfoForm };
