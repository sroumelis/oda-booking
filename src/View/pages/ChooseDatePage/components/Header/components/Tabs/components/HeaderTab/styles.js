import { StyleSheet } from "aphrodite";
import oda from "../../../../../../../../common/theme/oda";

export default StyleSheet.create({
  textAlignCenter: {
    textAlign: "center",
  },
  tabClass: {
    cursor: "pointer",
    padding: "8px",
    width: "130px",
    maxWidth: "130px",
    position: "relative",
    border: "1px solid " + oda.colors.background,
    backgroundColor: oda.colors.surface,
    zIndex: 2,
    transitionDuration: "0.3s",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "30px",
    "@media (max-width: 420px)": {
      padding: "8px 0px",
      border: 0,
      width: "unset",
      flex: 1,
      borderRadius: 30,
    },
  },
  selectedTab: {
    backgroundColor: oda.colors.primary,
    // "@media (max-width: 420px)": {
    // backgroundColor: 'transparent',
    // },
  },
  selectedText: {
    color: oda.colors.surface,
  },
  subtitleText: {
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    fontWeight: 500,
    display: "inline-block",
    color: oda.colors.primary,
  },
  grayText: {
    color: oda.colors.disabled,
    fontFamily: oda.fontFamilies.labels,
  },
  tabBottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
  tabImageSmall: {
    width: "16px",
    maxHeight: "16px",
    objectFit: "contain",
    marginLeft: 2,
  },
  text16px: {
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
  },
});
