import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

export default StyleSheet.create({
  disabledText: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    cursor: "pointer",
    textAlign: "center",
    color: oda.colors.primary,
    width: "100%",
    padding: 16,
  },
  refreshImage: {
    display: "block",
    margin: "auto",
    marginTop: 8,
  },
});
