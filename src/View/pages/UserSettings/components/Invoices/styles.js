import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  instructionsText: {
    color: oda.colors.primary,
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    textAlign: "center",
    display: "block",
    marginBottom: 16,
  },
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 24,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  twoButtons: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "calc(50% - 8px) calc(50% - 8px)",
    gridGap: "16px",
    alignItems: "center",
  },
    disabledText: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    cursor: "pointer",
    textAlign: "center",
    color: oda.colors.disabled,
  },
});
