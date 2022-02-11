import { StyleSheet } from "aphrodite";
import oda from "../../../../common/theme/oda";

export default StyleSheet.create({
  carouselContainer: {
    backgroundColor: "gray",
    position: "relative",
    " .control-arrow": {
      opacity: "1!important",
    },
    height: "45vh",
    maxHeight: "45vh",
    "@media (max-width: 768px)": {
      maxHeight: "24vh",
    },
  },
  carouselOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(37,49,65,.5) 0%, rgba(9,9,121,0) 34%, rgba(0,212,255,0) 100%)",
    zIndex: 1,
  },
  menuIcon: {
    cursor: "pointer",
    position: "absolute",
    top: 8,
    left: 24,
    zIndex: 6,
  },
  infoIcon: {
    cursor: "pointer",
    position: "absolute",
    top: 8,
    right: 24,
    zIndex: 6,
  },
  carouselArrow: {
    width: "40px",
    height: "40px",
    zIndex: 3,
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "auto",
  },
  carouselArrowLeft: {
    left: 8,
  },
  carouselArrowRight: {
    right: 8,
  },
  carouselImage: {
    height: "100%",
    maxWidth: "100%",
    objectFit: "cover",
    maxHeight: "45vh",
    "@media (max-width: 768px)": {
      maxHeight: "30vh",
    },
    //TODO delete once carousel is fixed
  },
});
