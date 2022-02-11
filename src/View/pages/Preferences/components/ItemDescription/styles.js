import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  itemInfoContainer: {
    width: "100%",
    boxShadow: oda.boxShadows.faint,
  },
  positionRelative: {
    position: "relative",
  },
  itemHeaderImage: {
    width: "100%",
    // height: 'auto',
    objectFit: "cover",
    height: 300,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 300,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,.2)",
  },
  itemInfo: {
    backgroundColor: oda.colors.surface,
    width: "100%",
    padding: 16,
    boxShadow: oda.boxShadows.faint,
  },
  itemName: {
    fontSize: oda.fonts.large,
    fontWeight: "bold",
    lineHeight: oda.lineHeights.normal,
    display: "block",
    color: oda.colors.primary,
    fontFamily: oda.fontFamilies.labels,
  },
  descriptionText: {
    color: oda.colors.disabled,
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    display: "block",
  },
  smallImage: {
    width: "20px",
    objectFit: "contain",
    height: "20px",
  },
  infoFlex: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 12,
  },
  marginBottom4: {
    marginBottom: 4,
  },
  smallFlex: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
});
