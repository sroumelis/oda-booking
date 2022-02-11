import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda.js";

export default StyleSheet.create({
  fullHeight: {
    height: "100%",
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  instructionsText: {
    color: oda.colors.primary,
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    textAlign: "center",
    display: "block",
    marginBottom: 16,
  },
  normalRow: {
    marginTop: 16,
  },
  twoInputsRow: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "calc(50% - 16px) calc(50% - 16px)",
    gridGap: "32px",
    alignItems: "center",
    marginTop: 16,
  },
  twoButtons: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "calc(50% - 8px) calc(50% - 8px)",
    gridGap: "16px",
    alignItems: "center",
  },
});
