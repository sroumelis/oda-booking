import { StyleSheet } from "aphrodite";
import oda from "../../theme/oda";

export default StyleSheet.create({
  navbarContainer: {
    width: "100%",
    padding: "8px 16px",
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: oda.colors.primary,
    boxShadow: oda.boxShadows.normal,
  },
  itemPrefLeftCloseButton: {
    opacity: "0",
    pointerEvents: "none",
    cursor: "pointer",
    "@media (max-width: 768px)": {
      pointerEvents: "auto",
      opacity: 1,
    },
  },
  navbarTitle: {
    fontSize: oda.fonts.xlarge,
    lineHeight: oda.lineHeights.xlarge,
    fontFamily: oda.fontFamilies.labels,
    color: oda.colors.secondary,
  },
  itemPrefRightCloseButton: {
    opacity: "1",
    pointerEvents: "auto",
    cursor: "pointer",
    "@media (max-width: 768px)": {
      pointerEvents: "none",
      opacity: 0,
    },
  },
});
