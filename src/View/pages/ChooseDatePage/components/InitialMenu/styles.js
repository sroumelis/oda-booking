import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  initialMenuContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    alignItems: "center",
    gap: "8px",
    flexDirection: "row",
    height: "unset",
    maxWidth: "768px",
    margin: "auto",
    marginTop: "24px",
    borderRadius: "8px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      height: "100%",
      marginTop: "0px",
      borderRadius: "0px",
      gap: "1px",
      backgroundColor: oda.colors.surface,
      paddingTop: "0",
      paddingBottom: "0",
    },
  },
  moodText: {
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    color: oda.colors.primary,
    fontFamily: oda.fontFamilies.labels,
    marginTop: "24px",
    textAlign: "center",
    display: "block",
    "@media (max-width: 768px)": {
      marginBottom: 24,
    },
  },
  smallText: {
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    color: oda.colors.disabled,
  },
});
