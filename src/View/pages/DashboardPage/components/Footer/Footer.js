import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import logo from "../../../../common/img/no-image-available.jpg";
import facebook from "./img/facebook.svg";
import instagram from "./img/instagram.svg";
import twitter from "./img/twitter.svg";
import tripadvisor from "./img/tripadvisor.svg";

const Footer = (props) => {
  const { storeInfo } = props;

  return (
    <div className={css(styles.footerContainer)}>
      {/* <div className={css(styles.footerContent)}> */}
      <div className={css(styles.smallFlex)}>
        <div className={css(styles.smallSection)}>
          <img
            src={storeInfo?.logo || logo}
            alt=""
            className={css(styles.footerLogo)}
          />
        </div>
        <div className={css(styles.smallSection)}>
          <span className={css(styles.normalTxt)}>{storeInfo?.storeName}</span>
        </div>
        <div className={css(styles.smallSection)}>
          <span className={css(styles.normalTxt)}>{storeInfo?.address}</span>
        </div>
        <div className={css(styles.smallSection)}>
          <span
            onClick={() => window.open("tel:" + storeInfo?.phone)}
            className={css(styles.normalTxt)}
          >
            {storeInfo?.phone}
          </span>
        </div>
      </div>
      <div className={css(styles.smallFlex, styles.marginTop24)}>
        <div className={css(styles.smallSection)}>
          {/* <span className={css(styles.normalTxt)}>{storeInfo?.vat}</span> */}
          <span className={css(styles.normalTxt)}>Privacy Policy</span>
        </div>
        <div className={css(styles.smallSection)}>
          <span className={css(styles.normalTxt)}>Terms & Conditions</span>
        </div>
        <div className={css(styles.smallSection)}>
          <span className={css(styles.normalTxt)}>
            {/* {storeInfo?.personInCharge} */}
            Legal Info
          </span>
        </div>
        <div className={css(styles.smallSection)}>
          <span
            onClick={() => window.open(storeInfo?.website, "_blank")}
            className={css(styles.normalTxt)}
          >
            {storeInfo?.website}
          </span>
        </div>
      </div>
      <div className={css(styles.socialMediaFlex)}>
        {storeInfo?.facebook && (
          <img
            onClick={() => window.open(storeInfo?.facebook || "", "_blank")}
            src={facebook}
            alt=""
            className={css(styles.socialMediaIcon)}
          />
        )}
        {storeInfo?.instagram && (
          <img
            onClick={() => window.open(storeInfo?.instagram || "", "_blank")}
            src={instagram}
            alt=""
            className={css(styles.socialMediaIcon)}
          />
        )}
        {storeInfo?.twitter && (
          <img
            onClick={() => window.open(storeInfo?.twitter || "", "_blank")}
            src={twitter}
            alt=""
            className={css(styles.socialMediaIcon)}
          />
        )}
        {storeInfo?.tripadvisor && (
          <img
            onClick={() => window.open(storeInfo?.tripadvisor || "", "_blank")}
            src={tripadvisor}
            alt=""
            className={css(styles.socialMediaIcon)}
          />
        )}
      </div>
      <div className={css(styles.copyrightSection)}>
        © 2021 Oda market. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
