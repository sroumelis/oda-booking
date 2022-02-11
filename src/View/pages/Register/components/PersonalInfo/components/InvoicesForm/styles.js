import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  textField: {
    marginTop: 24,
  },
  twoFieldsRow: {
    display: "grid",
    gridTemplateColumns: "calc(50% - 12px) calc(50% - 12px)",
    gridGap: "24px",
  },
  quantityButton: {
    fontWeight: "bold",
    width: 32,
    minWidth: 32,
    maxWidth: 32,
    height: 32,
  },
  quantityButtonsFlex: {
    width: "100%",
    justifyContent: "flex-end",
    display: "flex",
    gap: 16,
    marginTop: 24,
  },
});
