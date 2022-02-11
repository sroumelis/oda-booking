import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import styles from "./styles";
import { navigate, useLocation, Router } from "@reach/router";
import {
  catalogActions,
  catalogSelectors,
} from "../../../State/modules/catalog/catalog";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Navbar } from "../../common/components";
import { storeByIdSelectors } from "../../../State/modules/storeById";
import facebook from "../DashboardPage/components/Footer/img/facebook.svg";
import instagram from "../DashboardPage/components/Footer/img/instagram.svg";
import { parseWeekday } from "../../../Utils/utilities";
import twitter from "../DashboardPage/components/Footer/img/twitter.svg";
import website from "./img/website.png";
import oda from "../../common/theme/oda";
const StyledDialog = withStyles({
  paperScrollPaper: {
    height: "100%",
    width: "100%",
    maxWidth: 768,
    maxHeight: 900,
    backgroundColor: oda.colors.surface,
    // backgroundColor: "red",
  },
})(Dialog);
const StoreInfo = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const selectedStore = useSelector(storeByIdSelectors.getStore);
  const location = useLocation();
  const { displayStoreInfo } = location.state;
  const theme = useTheme();
  const fullScreen = useMediaQuery("(max-width:768px)"); // previously in the parenthesis it was (theme.breakpoints.down('sm'))

  const parseSchedule = (scheduleObj) => {
    const _scheduleObj = [...scheduleObj];
    const _superScheduleObj = [];
    let currentIndex = 0;
    // sorting the days array so that the week will start from sunday
    _scheduleObj.sort(function (a, b) {
      return parseInt(a.day) - parseInt(b.day);
    });
    for (let i = 0; i < _scheduleObj.length; i += 1) {
      // For this to work we are using the _scheduleObj array which has this form
      // [{day: 6, from: '09:00:00', to: '02:00:00', isOpen: true}, ...]
      // At first we set currentIndex = 0.
      // then we check the current i with the currentIndex and if it's matching we do nothing
      // if it doesn't match then we take i-1 (which was matching) and set this as our endDay var
      // this makes the _superScheduleObj have an entry which says: (example) Time 09:00 - 13:00 starts from day 0
      // and ends on day 4. This means that we can group all days from 0 to 4
      if (
        _scheduleObj[currentIndex]?.from !== _scheduleObj[i]?.from ||
        _scheduleObj[currentIndex].to !== _scheduleObj[i].to
      ) {
        _superScheduleObj.push({
          ..._scheduleObj[currentIndex],
          endDay: _scheduleObj[i - 1]?.day,
        });
        currentIndex = i;
      }
      if (i === _scheduleObj.length - 1) {
        _superScheduleObj.push({
          ..._scheduleObj[currentIndex],
          endDay: _scheduleObj[i]?.day,
        });
      }
    }
    // if superScheduleObj has only 1 entry it means all days have the same
    // value so we will write "Every day " instead of sunday-saturday
    let isAllWeek = _superScheduleObj?.length === 1;
    return (
      <>
        {/* {_scheduleObj.map((day) => { */}
        {_superScheduleObj.map((day) => {
          let splitTimeFrom = day?.from?.split(":");
          let fromHours = splitTimeFrom?.[0];
          let fromMinutes = splitTimeFrom?.[1];
          let splitTimeTo = day?.to?.split(":");
          let toHours = splitTimeTo?.[0];
          let toMinutes = splitTimeTo?.[1];
          let text = "";
          if (isAllWeek) {
            text = "Every day";
          } else if (day?.endDay !== day?.day) {
            text = `${parseWeekday(day?.day)} - ${parseWeekday(day?.endDay)}:`;
          } else {
            text = `${parseWeekday(day?.day)}:`;
          }
          return (
            <>
              <span className={css(styles.headerSmall)}>{text}</span>
              <span
                className={css(styles.fieldValueSmall)}
              >{`${fromHours}:${fromMinutes} - ${toHours}:${toMinutes}`}</span>
            </>
          );
        })}
      </>
    );
  };

  const handleClose = () => {
    window.history.back();
  };

  if (!displayStoreInfo) {
    return null;
  }
  return (
    <StyledDialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Navbar onClose={handleClose} title="Store Info" />
      <div className={css(styles.pageContainer)}>
        <div className={css(styles.wrapper)}>
          {selectedStore?.profilePicture && (
            <img
              src={selectedStore.profilePicture}
              alt=""
              className={css(styles.shopIcon)}
            />
          )}
          <div className={css(styles.smallFlex)}>
            <span className={css(styles.storeName)}>
              {selectedStore?.name || "-"}
            </span>
            <span
              className={css(
                selectedStore.enabled && styles.openStore,
                !selectedStore.enabled && styles.closedStore
              )}
              style={{ textAlign: "left" }}
            >
              {selectedStore.enabled ? "(Open)" : "(Closed)"}
            </span>
          </div>
          <span
            className={css(styles.smallHeader, styles.disabledColor)}
            style={{ textAlign: "left" }}
          >
            {selectedStore?.category || "No category"}
          </span>
          <div className={css(styles.storeDescription)}>
            {selectedStore?.description || "No description"}
          </div>
        </div>
        <div className={css(styles.threeGrid, styles.wrapper)}>
          <div>
            <span className={css(styles.header)}>Address:</span>
            <span className={css(styles.fieldValue)}>
              {selectedStore?.parsedAddress || "-"}
            </span>
          </div>
          <div>
            <span className={css(styles.header)}>Legal Name:</span>
            <span className={css(styles.fieldValue)}>
              {selectedStore?.legalTitle || "-"}
            </span>
          </div>
          <div>
            <span className={css(styles.header)}>VAT:</span>
            <span className={css(styles.fieldValue)}>
              {selectedStore?.tax?.number || "-"}
            </span>
          </div>
          <div>
            <span className={css(styles.header)}>Phone:</span>
            <span
              onClick={() => {
                window.open(`tel:${selectedStore?.phoneNo?.phoneNumber || ""}`);
              }}
              className={css(styles.fieldValue)}
            >
              {selectedStore?.phoneNo?.phoneNumber || "-"}
            </span>
          </div>
          <div>
            <span
              onClick={() => {
                window.open(`mailto:${selectedStore?.email?.value || "-"}`);
              }}
              className={css(styles.header)}
            >
              E-mail:
            </span>
            <span className={css(styles.fieldValue)}>
              {selectedStore?.email?.value || "-"}
            </span>
          </div>
          <div />
          {selectedStore?.storeOptions?.map((option, i) => (
            <div>
              <span className={css(styles.header)}>{option?.option}:</span>
              <span
                className={css(
                  styles.fieldValue,
                  option?.enabled && styles.greenColor,
                  !option?.enabled && styles.redColor
                )}
              >
                {option?.enabled ? "Available" : "Not Available"}
              </span>
              <div className={css(styles.marginTop24)}>
                <span className={css(styles.header)}>
                  {option?.option + " schedule"}:
                </span>
                <div style={{ width: 1, height: 4 }} />
                {parseSchedule(option?.workingHours)}
              </div>
            </div>
          ))}
        </div>
        <div className={css(styles.flex, styles.wrapper)}>
          {selectedStore?.webSite?.url && (
            <img
              onClick={() => window.open(selectedStore?.webSite?.url, "_blank")}
              src={website}
              alt=""
              className={css(styles.websiteIcon)}
            />
          )}
          {selectedStore?.facebookLink && (
            <img
              onClick={() => window.open(selectedStore?.facebookLink, "_blank")}
              src={facebook}
              alt=""
              className={css(styles.socialMediaIcon)}
            />
          )}
          {selectedStore?.instagramLink && (
            <img
              onClick={() =>
                window.open(selectedStore?.instagramLink, "_blank")
              }
              src={instagram}
              alt=""
              className={css(styles.socialMediaIcon)}
            />
          )}
          {selectedStore?.twitterLink && (
            <img
              onClick={() => window.open(selectedStore?.twitterLink, "_blank")}
              src={twitter}
              alt=""
              className={css(styles.socialMediaIcon)}
            />
          )}
        </div>
        {/* facebook,instagram,website, delivery/dinein/takeajk/open generally */}
      </div>
    </StyledDialog>
  );
};

const memoizedStoreInfo = React.memo(StoreInfo);
export { memoizedStoreInfo as StoreInfo };
