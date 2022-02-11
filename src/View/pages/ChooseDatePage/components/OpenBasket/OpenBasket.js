/* eslint-disable jsx-a11y/alt-text */
import { withStyles } from '@material-ui/styles';
import React from 'react';
import styles from './styles';
import { StyleSheet, css } from 'aphrodite';
import { navigate, useLocation, Router } from '@reach/router';
import basket from '../../../../common/img/basket.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectedTabSelectors } from '../../../../../State/modules/selectedTab/';

const OpenBasket = (props) => {
  const selectedTab = useSelector(selectedTabSelectors.getSelectedTab);
  return selectedTab ? (
    <img
      src={basket}
      className={css(styles.el)}
      onClick={() =>
        navigate(
          process.env.REACT_APP_RELATIVE_PATH
            ? `/${process.env.REACT_APP_RELATIVE_PATH}/basket`
            : '/basket',
          { state: { mockData: 'asd' } }
        )
      }
    />
  ) : (
    <></>
  );
};

export default OpenBasket;
