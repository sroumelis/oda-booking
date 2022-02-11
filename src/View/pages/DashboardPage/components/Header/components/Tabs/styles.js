import { StyleSheet } from "aphrodite";
import oda from '../../../../../../common/theme/oda';

export default StyleSheet.create({
  tabsContainer: {
    padding: "0px",
    backgroundColor: oda.colors.surface,
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    width: "max-content",
    maxWidth: "768px",
    gap: "8px",
    margin: "auto",
    "@media (max-width: 768px)": {
      width: "100%",
      justifyContent: "space-evenly",
    },
    "@media (max-width: 420px)": {
      gap: "0px",
      width: "calc(100% + 24px)",
      marginLeft: "-12px",
    },
  },
});
