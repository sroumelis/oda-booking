import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  container: { width: "100%", display: "flex" },
  paddingContainer: { width: "100%", padding: "8px 12px" },
  horizontalHeaderFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  smallFlex: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  itemPrice: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    color: "#253141",
  },
  selectedItemIngredients: {
    color: oda.colors.disabled,
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    whiteSpace: "break-spaces",
    // marginTop: "10px",
    display: "inline",
    padding: "0px 8px",
  },
  subtext: {
    color: "#BFBFBF",
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    display: "block",
  },
});
