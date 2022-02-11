import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

const rotate = {
  "0%": {
    transform: "translate(-50%, -50%) rotate(0)",
  },
  "100%": {
    transform: "translate(-50%, -50%) rotate(360deg)",
  },
};

export default StyleSheet.create({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.6)",
    zIndex: 1400,
  },
  loader: {
    border: "8px solid transparent",
    borderRadius: "50%",
    borderTop: "8px solid " + oda.colors.primary,
    width: 80,
    height: 80,
    animationName: [rotate],
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1401,
  },
});
