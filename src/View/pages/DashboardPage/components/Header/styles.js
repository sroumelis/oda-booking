import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  headerRow: {
    width: "100%",
    backgroundColor: oda.colors.surface,
  },
  headerBoxShadow: {
    boxShadow: oda.boxShadows.faint,
    position: "relative",
  },
  headerOverallContainer: {
    position: "relative",
    zIndex: 5,
    width: "100%",
    maxWidth: "768px",
    margin: "auto",
    marginBottom: "0px",
    "@media (max-width: 768px)": {
      marginTop: "-30px",
      borderRadius: "30px 30px 0px 0px",
    },
  },
  headerContainer: {
    width: "100%",
    backgroundColor: oda.colors.surface,
    padding: "20px 25px 20px 25px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "30px 30px 0px 0px",
    position: "relative",
    "@media (max-width: 768px)": {
      paddingBottom: "0px",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },

  shopIcon: {
    position: "absolute",
    top: "-65px",
    left: "39px",
    width: "80px",
    height: "80px",
    padding: "8px",
    boxShadow: oda.boxShadows.faint,
    borderRadius: "50%",
    objectFit: "contain",
    backgroundColor: oda.colors.surface,
    "@media (max-width: 768px)": {
      // right: "39px",
      // left: "unset",
      // top: "-40px",
    },
  },
  shopInfoAndTabsFlex: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    width: "100%",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "16px",
    },
  },
  storeInfoGrid: {
    display: "flex",
    width: "100%",
    gap: "4px",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  storeName: {
    fontSize: oda.fonts.xxlarge,
    lineHeight: oda.lineHeights.xxlarge,
    fontWeight: 500,
    color: oda.colors.primary,
    fontFamily: oda.fontFamilies.labels,
  },
  smallText: {
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    color: oda.colors.disabled,
  },
  rightOnMobileDesign: {
    "@media (max-width: 768px)": {
      alignSelf: "flex-end",
    },
  },
  normalFontSize: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
  },
  additionalStoreInfoFlex: {
    display: "flex",
    backgroundColor: oda.colors.surface,
    gap: "16px",
  },
  headerTextWithTitle: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  grayText: {
    color: oda.colors.disabled,
  },
});
