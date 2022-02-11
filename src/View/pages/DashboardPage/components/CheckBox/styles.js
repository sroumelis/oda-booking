import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  horizontalFlex: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "space-between",
  },
  paddingRight0: {
    paddingRight: 0,
  },
  checkboxAndTextFlex: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  },
  checkboxText: {
    color: "#253141",
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    display: "block",
    fontWeight: 500,
    wordBreak: "keep-all",
    whiteSpace: "break-spaces",
    paddingTop: 8,
    paddingBottom: 8,
  },
});
