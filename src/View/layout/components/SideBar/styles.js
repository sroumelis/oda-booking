import { StyleSheet } from "aphrodite";
import oda from "../../../common/theme/oda";

export default StyleSheet.create({
  profileImage: {
    width: '48px',
    height: '48px',
    backgroundColor: oda.commonColors.white,
    display: 'block',
    objectFit: 'cover',
    cursor: 'pointer',
    marginLeft: 16,
  },
  username: {
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    fontWeight: 'bold',
    display: 'block',
    textAlign: 'center',
    marginBottom: '4px',
    cursor: 'pointer',
    marginTop: 8,
  },
  sidebar: {
    backgroundColor: oda.colors.surface,
    height: "100%",
    padding: "16px",
    minWidth: 250,
  },
  centeredFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});
