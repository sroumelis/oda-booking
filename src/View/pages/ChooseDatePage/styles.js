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
    padding: "16px 46px",
    borderRadius: 4,
    alignItems: "center",
    "@media (max-width: 768px)": {
      overflow: "auto",
      padding: "16px 0px",
      marginBottom: 50,
    },
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fcfcfc ",
    paddingTop: 20,
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
  wrapper: {
    backgroundColor: oda.colors.background + "69",
    borderRadius: 4,
    padding: 16,
    marginTop: 14,
    maxWidth: 562,
    "@media (max-width: 768px)": {
      marginBottom: 0,
    },
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: oda.fonts.normal,
    fontWeight: "bold",
    lineHeight: oda.lineHeights.large,
  },
});
