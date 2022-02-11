import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  catalogueMotherDiv: {
    padding: "8px 32px",
    boxShadow: oda.boxShadows.normal,
    borderRadius: "4px",
    // maxWidth: "1024px",
      maxWidth: "768px",
    // width: '100%',
    width: '100vw',
    backgroundColor: oda.colors.surface,
    "@media (max-width: 1356px)": {
      maxWidth: "768px",
      padding: "8px 16px",
    },
    "@media (max-width: 768px)": {
      padding: "16px",
      paddingTop: "0px",
      boxShadow: "none",
    },
  },
  catalogueContainer: {
    padding: "8px 0px",
    margin: "auto",
    width: "100%",
    backgroundColor: oda.colors.surface,
  },
});
