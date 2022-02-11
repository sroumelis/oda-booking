import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  quantityContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "0",
    padding: "16px",
    left: "0px",
    zIndex: 3,
    backgroundColor: oda.colors.surface,
    boxShadow: oda.boxShadows.normal,
  },
  odaText: {
    marginLeft: 4,
    color: oda.colors.odaColor,
    fontSize: oda.fonts.large,
    textTransform: "lowercase",
    fontFamily: oda.fontFamilies.odaText,
    fontWeight: 'bold',
  },
});
