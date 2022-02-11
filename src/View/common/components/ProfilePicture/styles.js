import { StyleSheet } from "aphrodite";
import oda from "../../theme/oda";

export default StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    position: "relative",
    margin: "auto",
    marginBottom: 26,
    border: "1px solid " + oda.colors.disabled,
  },
  smallWidthHeight: {
    width: 48,
    height: 48,
  },
  smallPictureInitialsText: {
    fontFamily: oda.fontFamilies.labels,
    fontWeight: "bold",
    fontSize: oda.fonts.xlarge,
  },
  profileImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    zIndex: 1,
    objectFit: "cover",
  },
  selectImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fileInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    opacity: 0,
    zIndex: 2,
    cursor: "pointer",
  },
  text: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    textAlign: "center",
  },
  initialsText: {
    fontSize: oda.fonts.profileInitialsSize,
    lineHeight: oda.lineHeights.profileInitialsSize,
    color: oda.colors.primary,
    textAlign: "center",
  },
  hoverEffect: {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.surface,

    textAlign: "center",
    zIndex: 3,
    backgroundColor: oda.colors.primary,
    ":hover": {
      opacity: 1,
    },
  },
  marginBottom0: {
    marginBottom: 0,
  }
});
