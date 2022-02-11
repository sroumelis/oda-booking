import React, { useEffect } from 'react';
import { processSilentRenew } from 'redux-oidc';

const SilentRenew = (props) => {
  processSilentRenew();

  return <div>SilentRenew</div>;
};

const memoizedSilentRenew = React.memo(SilentRenew);
export { memoizedSilentRenew as SilentRenew };
