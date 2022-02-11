import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  footerContainer: {
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center!important",
  },
  footerContent: {
    // width: "100%",
    margin: "auto",
    maxWidth: "768px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 32,
    gap: 8,
    "@media (max-width: 500px)": {
      flexDirection: "column",
    },
  },
  marginTop24: {
    marginTop: 24,
  },
  smallFlex: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "768px",
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 4,
    margin: "auto",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      display: "grid",
      gridTemplateColumns: "45% 45%",
      gridGap: "8px",
      justifyContent: "space-evenly",
      justifyItems: "center",
      marginBottom: 8,
    },
    "@media (max-width: 500px)": {
      display: "grid",
      gridTemplateColumns: "100%",
      justifyContent: "center",
    },
  },
  smallSection: {
    gap: 8,
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    paddingRight: 8,
    paddingLeft: 8,
  },
  bigSection: {
    flex: 1,
    gap: "8px",
    flexDirection: "column",
    textAlign: "left",
    paddingRight: 8,
    paddingLeft: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: oda.colors.primary,
    fontSize: oda.fonts.big,
    lineHeight: oda.lineHeights.big,
    display: "block",
    marginBottom: "8px",
    fontFamily: oda.fontFamilies.labels,
  },
  normalTxt: {
    color: oda.colors.disabled,
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    cursor: "pointer",
  },
  socialMediaFlex: {
    display: "flex",
    gap: "32px",
    width: "100%",
    justifyContent: "center",
    maxWidth: "768px",
    margin: "auto",
    marginTop: 36,
    marginBottom: 16,
  },
  footerLogo: {
    width: 64,
    height: 64,
    display: "block",
    objectFit: "contain",
  },
  socialMediaIcon: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
  copyrightSection: {
    width: "100%",
    padding: 16,
    color: oda.colors.disabled,
    textAlign: "center",
    borderTop: "1px solid " + oda.colors.disabledLowOpacity,
  },
});
