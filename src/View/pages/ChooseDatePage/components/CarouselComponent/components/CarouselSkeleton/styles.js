import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  skeletonContainer: {
    height: "100vh",
    maxWidth: "100%",
    objectFit: "cover",
    maxHeight: "45vh",
    "@media (max-width: 768px)": {
      maxHeight: "30vh",
    },
  },
});
