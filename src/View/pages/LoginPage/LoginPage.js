import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parse } from "query-string";
import { StyleSheet, css } from "aphrodite";
import { navigate, useLocation } from "@reach/router";
import { isMobile } from "react-device-detect";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import videoBrowser from "../../common/video/Market5secHD.mp4";
import videoMobile from "../../common/video/Market Instagram.mp4";

import styles from "./styles";

import userManager from "../../../Utils/userManager";
import { oidc_logout } from "../../../Utils/utilities";

import {
  catalogActions,
  catalogSelectors,
} from "../../../State/modules/catalog/catalog";

import { CircularButton } from "../../common/components";

const LoginPage = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const dispatch = useDispatch();
  const refPlayer = useRef();
  const location = useLocation();

  useEffect(() => {
    refPlayer.current.subscribeToStateChange(_handlePlayerStateChange);
    // http://localhost:3000/?id=2573ad1f-e01b-41c8-b134-08d926a6224a
    // http://localhost:3000/?id=78f4dbdb-66bc-4c8c-a584-dff80c9b7f70

    if (process.env.REACT_APP_RELATIVE_PATH) {
      const storeId = location.href
        .replace(/(.+\w\/)(.+)/, "/$2")
        .replace("/", "");
      storeId.replace("/", "");
      if (!storeId) {
        window.open(`https://alms.website:8014/`, "_self");
      } else if (storeId) {
        localStorage.storeID = storeId;
      }
    } else {
      const searchParams = parse(location.search);
      const { id } = searchParams;
      const storeId = localStorage.storeID;
      if (!id && !storeId) {
        window.open(`http://localhost:3001/`, "_self");
      } else if (id) {
        localStorage.storeID = id;
      }
    }
    localStorage.removeItem("cached-profile-picture");
    console.log("router");
  }, []);

  const _handlePlayerStateChange = (state, prevState) => {
    // copy player state to this component's state
    if (state.ended) {
      setShowButtons(true);
      // navigate(
      //   process.env.REACT_APP_RELATIVE_PATH
      //     ? `/${process.env.REACT_APP_RELATIVE_PATH}/catalogue`
      //     : "/catalogue",
      //   {
      //     state: {
      //       catalogueId: null, // getQueryVariable('catalogueId'),
      //     },
      //   }
      // );
    }
  };

  const _redirectToLogin = async () => {
    userManager.signinRedirect();
    // try {
    //   console.log('fetch');
    //   const data = {
    //     StoreId: '5CDA86A1-4CB6-4EBE-B879-3203A68E89BF',
    //     CatalogName: 'oda Catalog',
    //     Hash: '3AE025E89A21CEC3A81CB082FCC8B49D',
    //   };
    //   const catalog = await dispatch(catalogActions.fetchCatalog(data));
    //   navigate('/catalogue', {});
    //   console.log(catalog);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const user = async () => {
    const user = await userManager.getUser();
    console.log(user);
  };

  const _redirectToLogout = () => {
    oidc_logout();
  };

  return (
    <div className={css(styles.container)}>
      <>
        <Player ref={refPlayer} autoPlay={true} muted>
          <source src={isMobile ? videoMobile : videoBrowser} />
          <ControlBar>
            <ReplayControl disabled seconds={10} order={1.1} />
            <ForwardControl disabled seconds={30} order={1.2} />
            <CurrentTimeDisplay disabled order={4.1} />
            <TimeDivider disabled order={4.2} />
            <PlaybackRateMenuButton
              disabled
              rates={[5, 2, 1, 0.5, 0.1]}
              order={7.1}
            />
            <VolumeMenuButton disabled />
          </ControlBar>
        </Player>
      </>
      {showButtons && (
        <div className={css(styles.buttonContainer)}>
          <CircularButton
            className={css(styles.loginButton)}
            onClick={() => _redirectToLogin()}
          >
            {"Login"}
          </CircularButton>
          <CircularButton
            className={css(styles.registerButton)}
            // onClick={() =>
            //   navigate(`/${process.env.REACT_APP_RELATIVE_PATH}/register`, {})
            // }
            onClick={() => {
              navigate(
                process.env.REACT_APP_RELATIVE_PATH
                  ? `/${process.env.REACT_APP_RELATIVE_PATH}/register`
                  : "/register",
                {}
              );
            }}
          >
            {"Register"}
          </CircularButton>
          {/* <div
            onClick={() => _redirectToLogin()}
            className={css(styles.button)}
          >
            {'Login'}
          </div>
          <div
            onClick={() => navigate('/register', {})}
            className={css(styles.button)}
          >
            {'Register'}
          </div> */}
          {/* <div
            onClick={() => _redirectToLogout()}
            className={css(styles.button)}
          >
            {'LogOut'}
          </div>
          <div onClick={() => user()} className={css(styles.button)}>
            {'GetUser'}
          </div> */}
        </div>
      )}
    </div>
  );
};

const memoizedLoginPage = React.memo(LoginPage);
export { memoizedLoginPage as LoginPage };
