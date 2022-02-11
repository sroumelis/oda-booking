import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  el: {
    width: 44,
    height: 44,
    transform: "rotate(-90deg)",
    position: "fixed",
    bottom: 32,
    right: 32,
    cursor: "pointer",
    zIndex: 99,
    padding: 10,
    backgroundColor: oda.colors.surface,
    borderRadius: "50%",
    boxShadow: oda.boxShadows.normal,
  },
});
