import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  section: {
    width: "100%",
    // marginBottom: 16,
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
  flex: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    alignItems: "center",
  },
  gap4: {
    gap: 4,
  },
});
