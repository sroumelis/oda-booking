import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

export default StyleSheet.create({
  container: {
    padding: "16px",
    boxShadow: oda.boxShadows.normal,
    borderRadius: "4px",
    position: "relative",
    margin: "auto",
    backgroundColor: oda.colors.surface,
    paddingTop: 50,
    "@media (max-width: 1356px)": {
      maxWidth: "768px",
      padding: "16px 24px",
      paddingTop: 50,
    },
    "@media (max-width: 768px)": {
      boxShadow: oda.boxShadows.faint,
    },
  },
  normalPaddingTop: {
    paddingTop: 16,
    "@media (max-width: 1356px)": {
      paddingTop: 16,
    },
  },
  hideBoxShadowUnder768: {
    "@media (max-width: 768px)": {
      boxShadow: "none",
    },
  },
  fullWidth: { width: "100%" },
  minWidth220: {
    minWidth: 220,
  },
  removePadding: {
    padding: 0,
    paddingTop: 34,
    "@media (max-width: 1356px)": {
      padding: 0,
      paddingTop: 34,
    },
  },
  headerDiv: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 16px",
    backgroundColor: oda.colors.primary,
    gap: 8,
    color: oda.colors.secondary,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "4px 4px 0px 0px",
    boxShadow: oda.boxShadows.normal,
    "@media (max-width: 768px)": {
      boxShadow: oda.boxShadows.faint,
    },
  },
  textHeader: {
    fontFamily: oda.fontFamilies.labels,
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    textAlign: "center",
    color: oda.colors.secondary,
    marginBottom: 0,
  },
  headerImage: {
    width: 20,
    height: 20,
    objectFit: "contain",
  },
  marginTop24: {
    marginTop: 24,
  },
});
