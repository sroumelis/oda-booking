import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

export default StyleSheet.create({
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "1px solid " + oda.colors.primary,
    fontFamily: oda.fontFamilies.labels,
    fontWeight: "bold",
    fontSize: oda.fonts.xlarge,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: oda.colors.surface,
  },
});
