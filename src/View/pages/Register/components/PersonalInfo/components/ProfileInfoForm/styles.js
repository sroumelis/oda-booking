import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  textField: {
    marginTop: 24,
  },
  button: {
    marginTop: 36,
  },
  errorText: {
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.danger,
    display: "block",
    marginTop: 2,
    textAlign: 'center',
  },
});
