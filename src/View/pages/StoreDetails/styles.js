import { StyleSheet } from "aphrodite";
import oda from "../../common/theme/oda";

export default StyleSheet.create({
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    background: "#1890ff",
    color: "#fff",
    fontSize: oda.fonts.normal,
    cursor: "pointer",
    transition: ".3s background",
    ":hover": {
      background: "#40a9ff",
    },
  },
});
