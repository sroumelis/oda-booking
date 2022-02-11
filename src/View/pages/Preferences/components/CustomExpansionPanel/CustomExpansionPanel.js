import { withStyles } from '@material-ui/styles';
import React from 'react';
import styles from './styles';
import { StyleSheet, css } from 'aphrodite';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import oda from '../../../../common/theme/oda';

const StyledExpansionPanel = withStyles({
  root: {
    backgroundColor: oda.colors.surface,
    padding: '0',
    borderRadius: '0!important',
    boxShadow: oda.boxShadows.faint,
    marginBottom: '0',
    marginTop: 8,
  },
})(Accordion);

const StyledPanelSummary = withStyles({
  root: {
    minHeight: 'unset',
    padding: '0px',
    marginTop: 8,
  },
  focusVisible: {
    backgroundColor: 'transparent',
  },
  content: {
    margin: 0,
  },
  expanded: {
    minHeight: 'unset!important',
    margin: '0!important',
    marginTop: '8px!important',
  },
})(AccordionSummary);

const StyledPanelDetails = withStyles({
  root: {
    minHeight: 'unset',
    padding: '0px 4px',
    fontSize: oda.fonts.normal,
    lineHeight: oda.lineHeights.normal,
    color: oda.colors.primary,
    display: 'block',
  },
  // content: {
  //   margin: 0,
  // },
  // expanded: {
  //   minHeight: "unset!important",
  //   margin: "0!important",
  // },
})(AccordionDetails);

const CustomExpansionPanel = (props) => {
  const { children, isLoading, expanded, onChange, outerId } = props;

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const el = document.getElementById(outerId);
  //     if (el && expanded) {
  //       el.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }
  //   }, 500);
  // }, [expanded]);

  return !isLoading ? (
    <div className={css(styles.expansionPanelContainer)} id={outerId}>
      <StyledExpansionPanel
        defaultExpanded={expanded}
        onChange={(e, expanded, q) => {
          onChange(e, expanded);
        }}
        expanded={expanded}
        TransitionProps={{
          timeout: 300,
        }}
      >
        <StyledPanelSummary>
          {React.cloneElement(children[0], { shortView: !expanded })}
        </StyledPanelSummary>
        <StyledPanelDetails>{children[1]}</StyledPanelDetails>
      </StyledExpansionPanel>
    </div>
  ) : (
    <div
      style={{
        width: Math.floor(Math.random() * 100) + 35 + '%',
      }}
      className={css(styles.expansionPanelSkeleton)}
    ></div>
  );
};

const memoizedCustomExpansionPanel = React.memo(CustomExpansionPanel);
export { memoizedCustomExpansionPanel as CustomExpansionPanel };
