import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

export default StyleSheet.create({
  plusMinusFlex: {
    display: "flex",
    alignItems: "center",
    backgroundColor: oda.commonColors.white,
    gap: "2px",
  },
  changePreferenceNumber: {
    borderRadius: "50%",
    border: "2px solid " + oda.colors.primary,
    cursor: 'pointer',
    height: 24,
    width: 24,
  },
  itemQuantityContainer: {
    width: 24,
    height: 24,
    display: "flex",
    // backgroundColor: oda.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  itemQuantity: {
    fontSize: oda.fonts.normal,
    lineHeight: "15px",
    height: oda.fonts.normal,
    display: "block",
    color: oda.commonColors.primary,
    fontWeight: "bold",
  },
});
