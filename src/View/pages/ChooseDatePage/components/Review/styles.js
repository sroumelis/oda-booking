import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center!important",
    width: "100%",
    padding: 8,
  },
  selected: {
    paddingLeft: 4,
    borderLeft: "4px solid #253141",
  },
  sPoint: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center!important",
    flexDirection: "column",
    gap: 5,
    cursor: "pointer",
    width: "100%",
    marginTop: 5,
    padding: 10,
    // paddingRight: 0,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center!important",
  },
});
