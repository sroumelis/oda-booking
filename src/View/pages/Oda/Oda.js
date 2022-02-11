import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { navigate, useLocation, Router } from '@reach/router';

import styles from './styles';

import {
  catalogActions,
  catalogSelectors,
} from '../../../State/modules/catalog/catalog';

import { Variations } from '../Variations';
import { Cards } from '../Cards';

const Oda = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedProduct = (groupId, productId) => {
    let state = { groupId, productId };
    console.log(state);
    console.log(navigate);
    navigate(location.pathname, { state });
  };

  const selectedCard = (cardId) => {
    let state = { cardId };
    console.log(state);
    console.log(navigate);
    navigate(location.pathname, { state });
  };

  return (
    <div>
      <div
        onClick={() =>
          selectedProduct(
            '06d66edb-bb80-44e1-9944-e0def16f5f62',
            'bbad952d-9d3c-4027-8a90-0effe25f5335'
          )
        }
        className={css(styles.button)}
      >
        {'new Oda'}
      </div>
      <div
        onClick={() => selectedCard('06d66edb-bb80-44e1-9944-e0def16f5f62')}
        className={css(styles.button)}
      >
        {'new Cards'}
      </div>
      <Variations path={location.pathname} />
      <Cards path={location.pathname} />
    </div>
  );
};

const memoizedOda = React.memo(Oda);
export { memoizedOda as Oda };
