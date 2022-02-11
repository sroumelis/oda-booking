import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  el: {
    display: "none",
    width: 44,
    height: 44,
    position: "fixed",
    bottom: 32,
    left: 32,
    cursor: "pointer",
    objectFit: 'contain',
    zIndex: 99,
    padding: 10,
    backgroundColor: oda.colors.primary,
    borderRadius: "50%",
    boxShadow:oda.boxShadows.normal,
    "@media (max-width: 1130px)": {
      display: 'block'
    },
  },
});
