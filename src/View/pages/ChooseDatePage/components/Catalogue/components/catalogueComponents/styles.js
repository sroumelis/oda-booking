import { StyleSheet } from "aphrodite";
import oda from "../../../../../../common/theme/oda";

export default StyleSheet.create({
  catalogueItemNumberText: {
    color: oda.colors.disabled,
    marginLeft: "16px",
  },
  itemContainerFlex: {
    display: "grid",
    gridTemplateColumns: "calc(100% - 116px) 100px",
    gridGap: "16px",
    // padding: "16px 0px",
    padding: "16px",
    backgroundColor: oda.colors.backgroundSoft,
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid #EDEDEE",
    ":last-of-type": {
      borderBottom: "0px",
    },
    "@media (max-width: 400px)": {
      gridGap: "8px",
      gridTemplateColumns: "calc(100% - 93px) 85px",
    },
  },
  horizontalPadding: {
    paddingLeft: 16,
  },
  reducedOpacity: {
    opacity: 0.4,
  },
  itemTitle: {
    color: oda.colors.primary,
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    fontWeight: 500,
    display: "block",
    fontFamily: oda.fontFamilies.labels,
  },
  itemDescription: {
    color: oda.colors.disabled,
    fontSize: oda.fonts.small,
    lineHeight: oda.lineHeights.small,
    display: "block",
  },
  itemPrice: {
    color: oda.colors.primary,
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    display: "block",
    marginTop: "4px",
    fontWeight: 500,
  },
  itemInfoFlex: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    gap: "6px",
  },
  itemImage: {
    borderRadius: "16px",
    height: "100px",
    border: "1px solid " + oda.colors.disabledLowOpacity,
    objectFit: "cover",
    width: "100px",
    "@media (max-width: 400px)": {
      width: "85px",
      height: "85px",
    },
  },
  expansionPanelSkeleton: {
    height: 16,
    margin: "28px 16px 8px 16px",
    borderRadius: "8px",
    // animationDuration: "1s",
    maxWidth: "90%",
    // animationTImingFunction: "linear",
    opacity: 0.4,
    // animationName: [translateKeyframes],
    // animationIterationCount: "infinite",
    // position: "relative",
  },
  panelSummaryFlex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  panelSummaryFlexChild: {
    display: "flex",
    alignItems: "center",
  },
  panelArrow: {
    width: "18px",
    height: "18px",
    objectFit: "contain",
    transitionDuration: "0.25s",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  blackBorderBottom: {
    borderBottom: "1px solid " + oda.colors.primary,
  },
  grayBorderBottom: {
    borderBottom: "1px solid " + oda.colors.background,
  },
  upwardsArrow: {
    transform: "rotate(180deg)",
  },
});
