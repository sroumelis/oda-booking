import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda.js";

export default StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottom: "1px solid " + oda.colors.primary,
    color: oda.colors.primary,
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 32,
    "@media (max-width: 500px)": {
      gap: 16,
    },
  },
  borderTop: {
    borderTop: "1px solid " + oda.colors.primary,
  },
  miniFlex: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    cursor: "pointer",
  },
  deleteButton: {
    cursor: "pointer",
    marginLeft: "auto",
  },
});
