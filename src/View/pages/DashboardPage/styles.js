import { StyleSheet } from "aphrodite";
import oda from "../../common/theme/oda";

export default StyleSheet.create({
  categoriesAndCatalogue: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 64,
  },
  shopClosed: {
    width: "100%",
    display: "block",
    padding: "10px 16px 11px",
    marginTop: 24,
    borderRadius: 4,
    backgroundColor: oda.colors.danger,
    color: oda.colors.primary,
    fontWeight: "bold",
    boxShadow: oda.boxShadows.faint,
  },
  listItem: {
    marginTop: 6,
    paddingLeft: 28,
  },
  pageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: oda.colors.surface,
    padding: "16px 48px",
    borderRadius: 4,
  },
  wrapper: {
    backgroundColor: oda.colors.background + "69",
    borderRadius: 4,
    padding: 16,
    marginTop: 24,
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fcfcfc ",

    "@media (max-width: 768px)": {
      margin: "auto",
      backgroundColor: "#fcfcfc ",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: 15,
      position: "absolute",
      bottom: 0,
      boxShadow: "-3px -3px 6px rgb(0 0 0 / 10%)",
    },
  },
});
