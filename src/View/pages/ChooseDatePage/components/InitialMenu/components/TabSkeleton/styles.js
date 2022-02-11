import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  width100: {
    width: '100%',
  },
  initialTabContainer: {
    cursor: "pointer",
    boxShadow: oda.boxShadows.faint,
    width: "100%",
    maxWidth: 350,
    borderRadius: "20px",
    height: 179,
    "@media (max-width: 768px)": {
      padding: "16px",
      height: 111,
      borderRadius: "0px",
    },
  },
});
