import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import {
  TextField,
  Button,
  DateField,
  ProfilePicture,
  ReloadComponent,
} from "../../../../common/components";
import validation from "./validation";
import { addAddress } from "../../../../../State/modules/address/add/actions";
import { fetchUserInfo, setProfilePicture } from "../../../../../State/modules/user/userInfo/actions";
import { setLoader } from "../../../../../State/modules/globalLoader/actions";
import { editUser } from "../../../../../State/modules/user/editUser/actions";
import { setModal } from "../../../../../State/modules/confirmationModal/actions";
import { cleanBase64 } from "../../../../../Utils/utilities";
import { Form, Formik } from "formik";
import {
  getUserDetails,
  getProfileImage,
  getError,
} from "../../../../../State/modules/user/userInfo/selectors";
const EditUserInfo = (props) => {
  const dispatch = useDispatch();
  const { setActivePage, onCancel, isComingFromSidebar } = props;
  const userInfo = useSelector(getUserDetails);
  const userImage = useSelector(getProfileImage);
  const userInfoHasError = useSelector(getError);

  const userForm = {
    userImage,
    userImageName: "",
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    birthdate: new Date(userInfo?.birthdate),
    mobile: userInfo?.mobile,
  };

  const _editUserInfo = async (data) => {
    let isCreated = false;
    try {
      dispatch(setLoader(true));
      let obj = {
        name: `${data?.firstName} ${data?.lastName}`,
        // mobile: data?.mobile,
      };
      if (data?.userImage && data?.userImageName) {
        obj.picture = {
          name: data?.userImageName,
          documentAsBase64: cleanBase64(data?.userImage),
        };
      }
      const response = await dispatch(editUser(obj));
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content: "User info changed succesfully",
          title: "Success",
        })
      );
      isCreated = true;
      await localStorage.setItem(
        "cached-profile-picture",
        data?.userImage || ""
      );
      dispatch(setProfilePicture(data?.userImage || ""));
      await dispatch(fetchUserInfo(true));
      if (!isComingFromSidebar) {
        setActivePage(0);
      }
    } catch (e) {
      console.log(e);
      if (!isCreated) {
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content:
              "There was an error while editing the user info. Please try again",
            title: "Error",
          })
        );
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className={css(styles.fullHeight)}>
      {!userInfoHasError ? (
        <Formik
          initialValues={userForm}
          validationSchema={validation}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            _editUserInfo(values);
          }}
          render={({ values, handleChange, errors, setFieldValue }) => (
            <Form className={css(styles.form)}>
              <div>
                <ProfilePicture
                  selectedImage={values?.userImage}
                  name="userImage"
                  onChange={(e) => {
                    if (e?.target?.files?.[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        setFieldValue("userImage", reader.result);
                        setFieldValue(
                          "userImageName",
                          e?.target?.files?.[0]?.name
                        );
                      };
                    }
                  }}
                />
                <div className={css(styles.normalRow)}>
                  <TextField
                    value={values?.firstName}
                    onChange={handleChange}
                    name="firstName"
                    outerClassName={css(styles.textField)}
                    label="First Name"
                    error={errors?.firstName || false}
                  />
                </div>
                <div className={css(styles.normalRow)}>
                  <TextField
                    value={values?.lastName}
                    onChange={handleChange}
                    name="lastName"
                    outerClassName={css(styles.textField)}
                    label="Last Name"
                    error={errors?.lastName || false}
                  />
                </div>
                <div className={css(styles.normalRow)}>
                  <TextField
                    value={values?.mobile}
                    onChange={handleChange}
                    name="mobile"
                    outerClassName={css(styles.textField)}
                    label="Mobile"
                    error={errors?.mobile || false}
                  />
                </div>
                {/* <div className={css(styles.normalRow)}>
                <DateField
                  value={values?.birthdate}
                  disableFuture
                  onChange={(e) => {
                    setFieldValue("birthdate", new Date(e));
                  }}
                  name={"birthdate"}
                  label="Date of birth"
                  outerClassName={css(styles.textField)}
                  type="date"
                  error={errors?.birthdate || false}
                />
              </div> */}
              </div>
              <div className={css(styles.twoButtons)}>
                <Button onClick={onCancel} type="button">
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          )}
        />
      ) : (
        <ReloadComponent />
      )}
    </div>
  );
};

const memoizedEditUserInfo = React.memo(EditUserInfo);
export { memoizedEditUserInfo as EditUserInfo };
