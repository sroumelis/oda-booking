/* eslint-disable jsx-a11y/alt-text */
import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import menu from "./img/menu.svg";
import rightArrow from "../../../../common/img/chevron-right.svg";
import leftArrow from "../../../../common/img/chevron-left.svg";
import info from "./img/info-icon.svg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { CarouselSkeleton } from "./components/CarouselSkeleton";
import { navigate, useLocation, Router } from "@reach/router";

const CarouselComponent = (props) => {
  const { pictures, setIsSidebarOpen, isLoading } = props;
  const location = useLocation();

  const openStoreInfoModal = () => {
    navigate(location.pathname, {
      state: {
        displayStoreInfo: true,
      },
    });
  };

  return (
    <div className={css(styles.carouselContainer)}>
      <div className={css(styles.carouselOverlay)} />
      {/* <img
        src={menu}
        onClick={() => setIsSidebarOpen(true)}
        alt=""
        className={css(styles.menuIcon)}
      /> */}
      {/* <img
        src={info}
        alt=""
        className={css(styles.infoIcon)}
        onClick={openStoreInfoModal}
      /> */}
      {isLoading ? (
        <CarouselSkeleton />
      ) : (
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          // autoPlay
          // infiniteLoop
          dynamicHeight={false}
          // renderArrowPrev={(onClickHandler, hasPrev, label) =>
          //   hasPrev && (
          //     <img
          //       onClick={onClickHandler}
          //       className={css(styles.carouselArrow, styles.carouselArrowLeft)}
          //       src={leftArrow}
          //     />
          //   )
          // }
          // renderArrowNext={(onClickHandler, hasPrev, label) =>
          //   hasPrev && (
          //     <img
          //       onClick={onClickHandler}
          //       className={css(styles.carouselArrow, styles.carouselArrowRight)}
          //       src={rightArrow}
          //     />
          //   )
          // }
        >
          {pictures?.map((pic, i) => {
            return (
              <img
                className={css(styles.carouselImage)}
                src={pic?.url}
                alt=""
                key={i}
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselComponent;
