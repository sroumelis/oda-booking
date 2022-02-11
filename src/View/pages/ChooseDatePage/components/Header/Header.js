import React from "react";
import { withStyles } from "@material-ui/styles";
import { navigate } from "@reach/router";
import clsx from "clsx";

import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import { Tabs } from "./components/Tabs";
import { HeaderSkeleton } from "./components/HeaderSkeleton";
import noImageAvailable from "../../../../common/img/no-image-available.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import DateRange from "@material-ui/icons/DateRange";
import AccessTime from "@material-ui/icons/AccessTime";
import table from "./icons/table.png";
import SendIcon from "@material-ui/icons/Send";
import StepConnector from "@material-ui/core/StepConnector";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundColor: "#253141",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#253141",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#253141",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: "#253141",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: (
      <DateRange
        // color={active ? "red" : "blue"}
        backgroundColor="red"
      />
    ),
    2: <AccessTime />,
    3: <img src={table} width={25} />,
    4: <SendIcon />,
    5: <AccessTime />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const Header = (props) => {
  const {
    storeInfo,
    selectedTab,
    setTab,
    tabOptions,
    isLoading,
    steps,
    activeStep,
  } = props;

  return (
    <div
      className={css(styles.headerRow, !selectedTab && styles.headerBoxShadow)}
    >
      {!isLoading ? (
        <div className={css(styles.headerOverallContainer)}>
          <div className={css(styles.headerContainer)}>
            <img
              className={css(styles.shopIcon)}
              src={storeInfo?.logo || noImageAvailable}
              alt=""
            />
            <div className={css(styles.shopInfoAndTabsFlex)}>
              <div className={css(styles.storeInfoGrid)}>
                <div className={css(styles.storeName)}>
                  {storeInfo?.name || "-"}
                </div>
                {/* <div
                  className={css(
                    styles.smallText,
                    styles.rightOnMobileDesign,
                    styles.normalFontSize
                  )}
                >
                  {`${storeInfo?.foodCategory} ` || "-"}
                </div> */}
                <div style={{ width: "100%" }}>
                  <Stepper
                    style={{ backgroundColor: "#fcfcfc" }}
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<ColorlibConnector />}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HeaderSkeleton />
      )}
    </div>
  );
};

export default Header;
