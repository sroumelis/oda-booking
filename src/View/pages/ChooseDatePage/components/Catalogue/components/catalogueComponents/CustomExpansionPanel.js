import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { StyleSheet, css } from "aphrodite";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import expandPanelIcon from "../../../../../../common/img/expand-panel.svg";
import oda from "../../../../../../common/theme/oda.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const StyledExpansionPanel = withStyles({
  root: {
    backgroundColor: "transparent!important",
    fontSize: oda.fonts.large,
    lineHeight: oda.lineHeights.large,
    color: oda.colors.primary,
    padding: "0",
    borderBottom: "0px",
    borderRadius: "0!important",
    boxShadow: "none",
    marginTop: "0",
    marginBottom: "0",
  },
})(Accordion);

const StyledPanelSummary = withStyles({
  root: {
    minHeight: "unset",
    padding: "12px 0px",
    // fontWeight: "bold",
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    fontFamily: oda.fontFamilies.labels,
  },
  focusVisible: {
    backgroundColor: oda.commonColors.transparent,
  },
  content: {
    margin: 0,
  },
  expanded: {
    minHeight: "unset!important",
    margin: "0!important",
    fontWeight: "bold",
  },
})(AccordionSummary);

const StyledPanelDetails = withStyles({
  root: {
    minHeight: "unset",
    padding: "0px",
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    display: "block",
  },
})(AccordionDetails);

const CustomExpansionPanel = (props) => {
  const {
    children,
    title,
    isLoading,
    isExpanded,
    setIsExpanded,
    subtitle,
    containerId,
  } = props;
  // const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById(containerId);
      if (el && isExpanded) {
        // el.scrollIntoView({ behavior: "smooth", block: "start" });

        let searchBarHeight = 0;
        let searchBar = document.getElementById("search-bar-div");
        searchBarHeight = searchBar?.getBoundingClientRect()?.height || 0;
        const y =
          el.getBoundingClientRect().top + window.pageYOffset - searchBarHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 550);
  }, [isExpanded]);

  return !isLoading ? (
    <div>
      <StyledExpansionPanel
        // onChange={() => setIsExpanded(!isExpanded)}
        expanded={isExpanded === true}
      >
        <StyledPanelSummary
          onClick={() => setIsExpanded(!isExpanded)}
          className={css(
            isExpanded && styles.blackBorderBottom,
            !isExpanded && styles.grayBorderBottom
          )}
        >
          <div className={css(styles.panelSummaryFlex)}>
            <div className={css(styles.panelSummaryFlexChild)}>
              {title}
              <span className={css(styles.catalogueItemNumberText)}>
                {subtitle}
              </span>
            </div>
            <img
              className={css(
                styles.panelArrow,
                isExpanded && styles.upwardsArrow
              )}
              src={expandPanelIcon}
              alt=""
            />
          </div>
        </StyledPanelSummary>
        <StyledPanelDetails>{children}</StyledPanelDetails>
      </StyledExpansionPanel>
    </div>
  ) : (
    <SkeletonTheme
      color={oda.colors.background}
      highlightColor={oda.colors.disabled + "50"}
    >
      <div
        style={{
          width: Math.floor(Math.random() * 100) + 35 + "%",
        }}
        className={css(styles.expansionPanelSkeleton)}
      >
        <Skeleton height="100%" />
      </div>
    </SkeletonTheme>
  );
};

export default CustomExpansionPanel;
