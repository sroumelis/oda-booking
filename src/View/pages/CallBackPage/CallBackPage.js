import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { CallbackComponent } from 'redux-oidc';
import { navigate } from '@reach/router';

import styles from './styles';

import userManager from '../../../Utils/userManager';
import { getQueryVariable } from '../../../Utils/utilities';

import {
  catalogActions,
  catalogSelectors,
} from '../../../State/modules/catalog/catalog';

import { authenticationActions } from '../../../State/modules/user/authentication';

const CallBackPage = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);
  return (
    // <CallbackComponent
    //   userManager={userManager}
    //   successCallback={(user) => {
    //     console.log(user);
    //     dispatch(authenticationActions.isAuthenticated());
    //     localStorage.refresh_token = user.refresh_token;
    //     navigate('/catalogue', {
    //       state: {
    //         catalogueId: getQueryVariable('catalogueId'),
    //       },
    //     });
    //   }}
    //   errorCallback={(error) => {
    //     navigate('/');
    //     console.error(error);
    //   }}
    // >
    //   <div className={css(styles.container)}>
    //     <div>Redirecting...</div>
    //   </div>
    // </CallbackComponent>

    <CallbackComponent
      userManager={userManager}
      successCallback={(user) => {
        dispatch(authenticationActions.isAuthenticated());
        localStorage.refresh_token = user.refresh_token;
        navigate(
          process.env.REACT_APP_RELATIVE_PATH
            ? `/${process.env.REACT_APP_RELATIVE_PATH}/catalogue`
            : '/catalogue',
          {
            state: {
              catalogueId: getQueryVariable('catalogueId'),
            },
          }
        );
      }}
      errorCallback={(error) => {
        navigate(
          process.env.REACT_APP_RELATIVE_PATH
            ? `/${process.env.REACT_APP_RELATIVE_PATH}/`
            : '/'
        );

        console.error(error);
      }}
    >
      <div className={css(styles.container)}>
        <div>Redirecting...</div>
      </div>
    </CallbackComponent>
  );
};

const memoizedCallBackPage = React.memo(CallBackPage);
export { memoizedCallBackPage as CallBackPage };
