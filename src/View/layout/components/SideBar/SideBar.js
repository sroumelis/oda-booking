import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import oda from "../../../common/theme/oda";
import { useDispatch, useSelector } from "react-redux";
import {
  InitialsProfileImage,
  ProfilePicture,
} from "../../../common/components";
import { navigate, useLocation, Router } from "@reach/router";
import { oidc_logout } from "../../../../Utils/utilities";
import { getProfileImage } from "../../../../State/modules/user/userInfo/selectors";
const StyledDrawer = withStyles({
  root: {
    backgroundColor: "transparent!important",
  },
})(Drawer);

const StyledList = withStyles({
  root: {
    backgroundColor: "transparent!important",
    padding: 0,
  },
})(List);

const StyledDivider = withStyles({
  root: {
    backgroundColor: oda.colors.background,
    margin: "8px 0px",
  },
})(Divider);

const StyledListItem = withStyles({
  root: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    cursor: "pointer",
    padding: "8px 16px",
  },
})(ListItem);

const SideBar = (props) => {
  const { isOpen, setIsOpen, name } = props;
  const profileImage = useSelector(getProfileImage);

  const location = useLocation();
  const openAddressesModal = () => {
    navigate(location.pathname, {
      state: {
        displaySettings: true,
        userSettings: false,
        paymentMethods: false,
        addresses: true,
        isComingFromSidebar: true,
      },
    });
  };
  const openPaymentsModal = () => {
    navigate(location.pathname, {
      state: {
        displaySettings: true,
        userSettings: false,
        paymentMethods: true,
        addresses: false,
        invoices: false,
        isComingFromSidebar: true,
      },
    });
  };

  const openUserSettingsModal = () => {
    navigate(location.pathname, {
      state: {
        displaySettings: true,
        userSettings: true,
        paymentMethods: false,
        addresses: false,
        invoices: false,
        isComingFromSidebar: true,
      },
    });
  };

  const openInvoicesModal = () => {
    navigate(location.pathname, {
      state: {
        displaySettings: true,
        userSettings: false,
        paymentMethods: false,
        addresses: false,
        invoices: true,
        isComingFromSidebar: true,
      },
    });
  };

  const logout = () => {
    localStorage.setItem("cached-profile-picture", "");
    oidc_logout();
  };

  return (
    <StyledDrawer open={isOpen} onClose={() => setIsOpen(false)}>
      <div
        role="presentation"
        className={css(styles.sidebar)}
        onClick={() => setIsOpen(false)}
        onKeyDown={() => setIsOpen(false)}
      >
        <StyledList>
          {/* TODO: Remove the chef default image */}
          <ProfilePicture
            smallPicture
            selectedImage={profileImage}
            disableChange
          />
          {/* TODO: Remove the chef default name */}
          <span className={css(styles.username)}>{name || "Χρήστης"}</span>
          <StyledDivider />
          <StyledListItem onClick={openUserSettingsModal}>
            Profile Settings
          </StyledListItem>
          <StyledListItem onClick={openAddressesModal}>
            Address Settings
          </StyledListItem>
          <StyledListItem onClick={openPaymentsModal}>
            Payment Settings
          </StyledListItem>
          <StyledListItem onClick={openInvoicesModal}>
            Invoice Settings
          </StyledListItem>
          <StyledDivider />
          <StyledListItem onClick={logout}>Logout</StyledListItem>
        </StyledList>
      </div>
    </StyledDrawer>
  );
};

export default SideBar;
