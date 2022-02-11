import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  instructionsStep: {
    display: "grid",
    gridTemplateColumns: "calc(50% - 16px) calc(50% - 16px)",
    gridGap: "0px 32px",
  },
  categoryTitle: {
    color: oda.colors.primary,
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    fontWeight: "bold",
    display: "block",
    marginBottom: 8,
    paddingLeft: 7,
  },
});
