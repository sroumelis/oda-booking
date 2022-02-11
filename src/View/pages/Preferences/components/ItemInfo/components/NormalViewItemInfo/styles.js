import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  itemInfoContainer: {
    width: "100%",
  },
  expandedItemFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallFlex: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    justifyContent: "space-between",
  },
  itemPrice: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    color: "#253141",
    fontWeight: "bold",
  },
});
