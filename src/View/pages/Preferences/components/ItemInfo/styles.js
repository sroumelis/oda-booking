import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  itemInfoContainer: {
    width: "100%",
  },
  itemName: {
    fontSize: oda.fonts.large,
    fontWeight: "bold",
    lineHeight: oda.lineHeights.normal,
    display: "block",
    color: "#253141",
    fontFamily: oda.fontFamilies.labels,
  },
  horizontalHeaderFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  subtext: {
    color: "#BFBFBF",
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    display: "block",
  },
  verticalFlex: {
    display: "flex",
    gap: "8px",
    flexDirection: "column",
    marginTop: 8,
  },
  smallFlex: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  smallImage: {
    width: "20px",
    height: "20px",
  },
  itemHeaderImage: {
    borderRadius: "16px",
    border: "1px solid " + oda.colors.disabledLowOpacity,
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  itemPrice: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    color: "#253141",
  },
  shortHeaderDescriptionAndQuantityContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "8px",
    marginTop: 4,
    // alignItems: "flex-start",
    alignItems: "center",
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
  expandedItemFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityText: {
    paddingBottom: 2,
    display: "block",
    color: oda.colors.primary,
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
  },
});
