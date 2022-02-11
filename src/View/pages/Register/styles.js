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
  bottomPlaceholder: {
    paddingBottom: 64,
  },
  loginText: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    fontFamily: oda.fontFamilies.normal,
    display: "block",
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    ":hover": {
      textDecoration: "underline",
    },
  },
  loginTextbutton: {
    margin: "auto",
    marginTop: 32,
    position: "relative",
    left: -6,
    maxWidth: 1024,
    width: "100%",
    display: "block",
    "@media (max-width: 768px)": {
      padding: "0 24px",
    },
    "@media (max-width: 1356px)": {
      maxWidth: "768px",
    },
  },
  text: {
    fontFamily: oda.fontFamilies.labels,
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    color: oda.colors.primary,
    display: "block",
    textAlign: "center",
    marginBottom: 16,
  },
});
