import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  searchBar: {
    backgroundColor: oda.colors.surface,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "4px",
    margin: "auto",
    boxShadow: oda.boxShadows.normal,
    // maxWidth: "1024px",
    maxWidth: "768px",
    marginTop: 24,
    marginBottom: 24,
    position: "sticky",
    top: 0,
    zIndex: 3,
    width: "100%",
    padding: "8px",
    "@media (max-width: 768px)": {
      width: "calc(100% - 32px)",
      boxShadow: "none",
      border: "1px solid " + oda.colors.background,
    },
    "@media (max-width: 1056px)": {
      maxWidth: "768px",
    },
  },
  searchBarExpanded: {
    borderRadius: "4px 4px 0px 0px",
    borderBottom: "2px solid " + oda.colors.background,
  },
  searchBarResultsInvisibleBg: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "transparent",
    top: 0,
    left: 0,
  },
  searchBarResults: {
    position: "absolute",
    top: 58,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxHeight: "384px",
    padding: "8px 16px",
    overflow: "auto",
    zIndex: 11,
    borderRadius: "0px 0px 4px 4px",
    backgroundColor: oda.colors.surface,
    boxShadow: oda.boxShadows.normal,
    "@media (max-width: 768px)": {
      boxShadow: oda.boxShadows.faint,
    },
  },
});
