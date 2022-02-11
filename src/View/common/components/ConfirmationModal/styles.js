import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

const rotate = {
  "0%": {
    transform: "translate(-50%, -50%) rotate(0)",
    "-moz-transform": "translate(-50%, -50%) rotate(0)",
    "-webkit-transform": "translate(-50%, -50%) rotate(0)",
  },
  "100%": {
    transform: "translate(-50%, -50%) rotate(360deg)",
    "-moz-transform": "translate(-50%, -50%) rotate(360deg)",
    "-webkit-transform": "translate(-50%, -50%) rotate(360deg)",
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
    zIndex: 1301,
  },
  modalWindow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 24,
    borderRadius: 5,
    backgroundColor: oda.colors.surface,
  },
  title: {
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    color: oda.colors.primary,
    display: "block",
    textAlign: "left",
    marginBottom: 16,
    fontFamily: oda.fontFamilies.elegance,
    fontWeight: 500,
  },
  content: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    display: "block",
    textAlign: "left",
    // height: "60vh",
    maxHeight: 550,
    overflow: "auto",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 24,
    gap: 24,
    width: "100%",
  },
  closeButton: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 8,
    right: 8,
    cursor: "pointer",
  },
  loader: {
    border: "4px solid transparent",
    borderRadius: "50%",
    borderTop: "4px solid " + oda.colors.primary,
    width: 32,
    height: 32,
    animationName: [rotate],
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    margin: 0,
    position: "absolute",
    top: 16,
    // transform: "translateX(-50%)",
    left: "50%",
  },
  textAlignCenter: {
    textAlign: "center",
  },
  loaderContainer: {
    marginTop: 16,
    width: "100%",
    position: "relative",
    height: "42px",
  },
});
