import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda.js";

export default StyleSheet.create({
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    objectFit: "cover",
  },
  container: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'space-between',
    gridTemplateColumns: '64px 1fr 24px',
    gridGap: 8,
    paddingBottom: 48,
  },
  cursorPointer: {
    cursor: 'pointer'
  }
});
