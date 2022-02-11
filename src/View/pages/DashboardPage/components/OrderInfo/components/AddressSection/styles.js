import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  section: {
    width: "100%",
  },
  smallHeader: {
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    color: oda.colors.primary,
    marginBottom: 16,
    display: "block",
    fontFamily: oda.fontFamilies.labels,
    textAlign: "center",
  },
  fieldValue: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    display: "block",
    textAlign: "center",
    cursor: "pointer",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    alignItems: "center",
  },
  paddingBottom24: {
    paddingBottom: 24,
  },
  commentsField: {
    width: "100%",
    // marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "48px calc(100% - 56px)",
    gap: 8,
    width: "100%",
    alignItems: "center",
  },
  putLeft: {
    justifySelf: "flex-start",
  },
  disabledText: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    cursor: "pointer",
    textAlign: "center",
    color: oda.colors.disabled,
  },
});
