import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  initialTabContainer: {
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    maxWidth: 350,
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid " + oda.colors.background,
    borderLeft: "1px solid " + oda.colors.background,
    borderRight: "1px solid " + oda.colors.background,
    boxShadow: oda.boxShadows.faint,
    flexGrow: 1,
    width: "100%",
    backgroundColor: oda.colors.surface,
    borderRadius: "20px",
    padding: "50px 16px",
    transitionDuration: "0.1s",
    ":hover": {
      boxShadow: oda.boxShadows.normal,
      opacity: "0.9",
    },
    "@media (max-width: 768px)": {
      padding: "16px",
      borderRadius: "0px",
      ":hover": {
        boxShadow:oda.boxShadows.normal,
        opacity: 1,
      },
    },
  },
  initialTabImage: {
    width: 28,
    height: 28,
    objectFit: 'contain',
    display: "block",
  },
  fancyRedText: {
    fontSize: oda.fonts.xlarge,
    lineHeight: oda.lineHeights.xlarge,
    fontWeight: "bold",
    display: "inline-block",
    color: oda.colors.danger,
    fontFamily: oda.fontFamilies.fancyButtons,
  },
  fancyYellowText: {
    fontSize: oda.fonts.xlarge,
    lineHeight: oda.lineHeights.xlarge,
    fontWeight: "bold",
    display: "inline-block",
    color: oda.colors.secondary,
    fontFamily: oda.fontFamilies.fancyButtons,
  },
  subtitleText: {
    // fontSize: oda.fonts.small,
    // lineHeight: oda.lineHeights.small,
    fontSize: oda.fonts.xlarge,
    lineHeight: oda.lineHeights.xlarge,
    fontWeight: 500,
    display: "inline-block",
    marginTop: 4,
    color: oda.colors.primary,
  },
});
