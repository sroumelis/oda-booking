import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  text: {
    fontFamily: oda.fontFamilies.labels,
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    color: oda.colors.primary,
    display: "block",
    textAlign: 'center',
    marginTop: 32,
  },
});
