import { StyleSheet } from "aphrodite";
import oda from "../../common/theme/oda";

export default StyleSheet.create({
  pageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    backgroundColor: oda.colors.surface,
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
});
