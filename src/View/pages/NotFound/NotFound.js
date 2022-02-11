import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { navigate } from '@reach/router';

import styles from './styles';

import {
  catalogActions,
  catalogSelectors,
} from '../../../State/modules/catalog/catalog';

const NotFound = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className={css(styles.button)}>{'Not Found'}</div>
    </>
  );
};

const memoizedRegister = React.memo(NotFound);
export { memoizedRegister as NotFound };
