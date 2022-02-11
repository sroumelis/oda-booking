import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  shortcutsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "max-content",
    maxWidth: "250px",
    minWidth: "166px",
    gap: "8px",
    marginTop: "106px",
    marginRight: "32px",
    position: "sticky",
    height: "max-content",
    top: "58px",
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
    "@media (max-width: 1390px)": {
      display: "none",
    },
  },
  shortcut: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    // paddingLeft: 4,
    marginBottom: 3,
    cursor: "pointer",
    display: "block",
  },
  shortcutHeader: {
    borderLeft: "2px solid " + oda.colors.primary,
    cursor: "unset",
    fontFamily: oda.fontFamilies.labels,
  },
  emptyShortcuts: {
    textAlign: "center",
    minHeight: 68,
  },
  expanded: {
    fontWeight: 500,
    paddingLeft: 5,
    borderLeft: "2px solid " + oda.colors.secondary,
  },
});
