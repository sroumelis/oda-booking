import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  container: {
    // width: "max-content",
    width: "100%",
    maxWidth: "300px",
    minWidth: "170px",
    marginTop: "106px",
    marginLeft: "32px",
    position: "sticky",
    height: "max-content",
    top: "58px",
    backgroundColor: oda.colors.surface,
    maxHeight: "calc(100vh - 88px)",
    overflowY: "auto",
    "::-webkit-scrollbar": {
      ":vertical": {
        display: "none",
      },
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    borderRadius: "4px",
    "@media (max-width: 1130px)": {
      display: "none",
    },
  },
  actAsModal: {
    margin: "0",
    width: "100%",
    height: "100%",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "unset",
    position: "unset",
    top: 0,
    left: 0,
    "@media (max-width: 1100px)": {
      display: "block",
    },
  },
  commentsField: {
    width: "100%",
  },
  listItem: {
    marginTop: 6,
    paddingLeft: 28,
  },
});
