import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  section: {
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    gap: 8,
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
    justifyContent: "flex-start",
    gap: 8,
    width: "100%",
    alignItems: "center",
    cursor: 'pointer',
  },
});
