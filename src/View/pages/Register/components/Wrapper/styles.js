import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  container: {
    padding: "16px 32px",
    boxShadow: oda.boxShadows.normal,
    borderRadius: "4px",
    maxWidth: "1024px",
    position: 'relative',
    width: "100vw",
    margin: "auto",
    backgroundColor: oda.colors.surface,
    "@media (max-width: 1356px)": {
      maxWidth: "768px",
      padding: "16px 24px",
    },
    "@media (max-width: 768px)": {
      boxShadow: oda.boxShadows.faint,
    },
  },
  hideBoxShadowUnder768: {
    "@media (max-width: 768px)": {
      boxShadow: "none",
    },
  },
  textHeader: {
    fontFamily: oda.fontFamilies.labels,
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    color: oda.colors.primary,
    marginBottom: 32,
    display: "block",
  },
  marginTop24: {
    marginTop: 24,
  },
  containerStyleForSpecialHeader: {
    paddingTop: 72,
    "@media (max-width: 1356px)": {
      paddingTop: 72,
    },
  },
  specialTextHeader: {
    textAlign: "center",
    padding: "12px 16px",
    backgroundColor: oda.colors.primary,
    color: oda.colors.secondary,
    width: "100%",
    marginBottom: 0,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "4px 4px 0px 0px",
  },
});
