import { StyleSheet } from "aphrodite";
import oda from "../../common/theme/oda";

export default StyleSheet.create({
  pageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    paddingBottom: 64,
    backgroundColor: oda.colors.surface,
  },
  itemPreferencesContent: {
    width: "100%",
    height: "calc(100% - 43px)",
    display: "flex",
    flexDirection: "column",
    padding: "0px 8px",
    overflow: "auto",
  },
  eleganceFont: {
    fontFamily: oda.fontFamilies.labels,
  },
  padding8: {
    padding: "8px",
  },
  checkboxesContainerFlex: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "0px 8px 16px 8px",
  },
  marginTop16: {
    marginTop: 16,
  },
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
