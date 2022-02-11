import { StyleSheet } from "aphrodite";
import oda from "../../common/theme/oda";

export default StyleSheet.create({
  container: {
    backgroundColor: "#253141",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginButton: {
    border: "14px solid " + oda.colors.secondary,
    color:  oda.colors.secondary,
  },
  registerButton: {
    border: "14px solid " + oda.colors.danger,
    color:  oda.colors.danger,
    marginTop: 16,
  },
});
