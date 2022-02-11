import { StyleSheet } from "aphrodite";
import oda from '../../../common/theme/oda';

export default StyleSheet.create({
      errorText: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.danger,
    display: "block",
    textAlign: "left",
    marginTop: 2,
  },
  width100: {
    width: "100%",
  },
});
