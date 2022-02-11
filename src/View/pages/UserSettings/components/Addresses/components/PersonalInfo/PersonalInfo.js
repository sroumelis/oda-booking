import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import {
  TextField,
  Button,
  DateField,
} from "../../../../../../common/components";
import validation from "./validation";
import { addAddress } from "../../../../../../../State/modules/address/add/actions";
import { fetchUserInfo } from "../../../../../../../State/modules/user/userInfo/actions";
import { setLoader } from "../../../../../../../State/modules/globalLoader/actions";
import { Form, Formik } from "formik";
import EditIcon from "./img/edit.svg";

const PersonalInfo = (props) => {
  const dispatch = useDispatch();
  const { setActivePage, userInfo } = props;
  const userForm = {
    userImage: userInfo?.userImage,
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    birthdate: new Date(userInfo?.birthdate),
    mobile: userInfo?.mobile,
  };

  React.useEffect(() => {
    console.log("mount");
  }, []);

  return (
    <div className={css(styles.container)}>
      <img
        src={userInfo.userImage}
        alt=""
        className={css(styles.profileImage)}
      />
      <div className={css(styles.infoFlex)}>
        <span>{userInfo?.firstName + " " + userInfo?.lastName}</span>
        <br />
        <span>Mobile: {userInfo?.mobile}</span>
      </div>
      <img
        src={EditIcon}
        className={css(styles.cursorPointer)}
        onClick={() => setActivePage(3)}
        alt=""
      />
    </div>
  );
};

const memoizedPersonalInfo = React.memo(PersonalInfo);
export { memoizedPersonalInfo as PersonalInfo };
