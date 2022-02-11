// @flow
import React, { type ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { historyHelpers } from '../../../Utils';

export type Props = {
  Component: ComponentType<Props>,
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  historyHelpers.saveCurrentRoute();
  return (
    <Route
      {...rest}
      render={(props) =>
        false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
