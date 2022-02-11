import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda.js";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 32,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottom: "1px solid " + oda.colors.primary,
    color: oda.colors.primary,
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    "@media (max-width: 500px)": {
      gap: 16,
    },
  },
  cardImage: {
    width: 22,
    height: 22,
    objectFit: 'contain',
  },
  miniFlex: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    cursor: "pointer",
  },
  borderTop: {
    borderTop: "1px solid " + oda.colors.primary,
  },
  deleteButton: {
    cursor: "pointer",
    marginLeft: "auto",
  },
});
