import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

export default StyleSheet.create({
  errorText: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.danger,
    display: "block",
    textAlign: "left",
    marginTop: 2,
  },
  invisiblePredictionsBg: {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    zIndex: 2,
  },
  predictionsContainer: {
    position: "absolute",
    zIndex: 3,
    left: 0,
    width: "100%",
    backgroundColor: oda.colors.surface,
    padding: "0px 0px",
    boxShadow: oda.boxShadows.strong,
    borderRadius: 4,
  },
  prediction: {
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: 4,
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    ":hover": {
      backgroundColor: (oda.colors.primary + '21'),
    },
  },
});
