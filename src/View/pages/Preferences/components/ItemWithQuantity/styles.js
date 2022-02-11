import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  horizontalFlex: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingRight: "8px",
    justifyContent: "space-between",
  },
  checkboxAndTextFlex: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: "4px",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  checkboxText: {
    color: "#253141",
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    fontWeight: 500,
    wordBreak: "break-all",
    whiteSpace: "break-spaces",
    paddingTop: 8,
    paddingBottom: 8,
  },
  quantityPadding: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
  },
  checkboxTextGray: {
    color: "#BFBFBF",
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    fontWeight: 500,
    paddingTop: 8,
    paddingBottom: 8,
  },
  price: {
    whiteSpace: "nowrap",
    wordBreak: "keep-all",
  },
});
