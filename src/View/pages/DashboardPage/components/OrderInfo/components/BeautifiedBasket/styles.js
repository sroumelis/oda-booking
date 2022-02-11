import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  section: {
    width: "100%",
  },
  content: {
    paddingBottom: 8,
    paddingTop: 8,
    borderBottom: "1px solid " + oda.colors.disabled,
    cursor: "pointer",
  },
  noBorderBottom: {
    borderBottom: "0px",
  },
  itemNamePrice: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    display: "block",
    fontFamily: oda.fontFamilies.labels,
    textAlign: "left",
  },
  ellipsis: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  priceAndX: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  itemContent: {
    fontSize: oda.fonts.vsmall,
    lineHeight: oda.lineHeights.vsmall,
    color: oda.colors.disabled,
  },
  bold: {
    fontWeight: "bold",
  },
  spaceBetweenFlex: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    marginBottom: 8,
    gap: 4,
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
  textCenter: {
    textAlign: "center",
  },
  disabledText: {
    color: oda.colors.disabled,
  },
  fieldValue: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    display: "block",
    textAlign: "center",
    cursor: "pointer",
  },
  deleteButton: {
    cursor: "pointer",
    marginLeft: "auto",
    width: 20,
    height: 20,
  },
});
