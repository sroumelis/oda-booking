import React, { Suspense, useEffect } from "react";
import { StylesProvider } from "@material-ui/styles";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
// import {
//   BrowserRouter as Router,
//   Redirect,
//   Route,
//   Switch,
// } from 'react-router-dom';
import { Router, Redirect, useLocation } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";

import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import theme from "./View/common/theme/oda";

import { history } from "./Utils";

import { authenticationSelectors } from "./State/modules/user/authentication";

import { PrivateRoute } from "./View/layout/routers";
import { DashboardPage } from "./View/pages/DashboardPage";
import { ChooseDatePage } from "./View/pages/ChooseDatePage";
import { LoginPage } from "./View/pages/LoginPage";
import { Register } from "./View/pages/Register";
import { NotFound } from "./View/pages/NotFound";
import { StoreDetails } from "./View/pages/StoreDetails";
import { Basket } from "./View/pages/Basket";
import { Oda } from "./View/pages/Oda";
import { CallBackPage } from "./View/pages/CallBackPage";
import { SilentRenew } from "./View/pages/SilentRenew";
import { ConfirmationModal } from "./View/common/components";
import { Loader } from "./View/common/components";
import { SideBar } from "./View/layout/components/SideBar";

const App = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const isAuthenticated = useSelector(
    authenticationSelectors.getAuthentication
  );

  // useEffect(() => {
  //   console.log('history');
  //   const currentListener = function (event) {
  //     if (event.type === 'popstate') {
  //       event.preventDefault();
  //       event.stopPropagation();

  //       var leave = 'confirm(message)';
  //       console.log(leave);
  //     } else {
  //       return 'message';
  //     }
  //   };
  //   window.onbeforeunload = currentListener;
  //   window.onhashchange = currentListener;
  // }, []);
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router style={{ height: "100%" }} primary={false} history={history}>
          {/**Add Layout */}
          {!isAuthenticated && (
            <LoginPage path={`${process.env.REACT_APP_RELATIVE_PATH}/`} />
          )}
          {!isAuthenticated && (
            <Register
              path={`${process.env.REACT_APP_RELATIVE_PATH}/register`}
            />
          )}
          {!isAuthenticated && (
            <CallBackPage
              path={`${process.env.REACT_APP_RELATIVE_PATH}/callback`}
            />
          )}
          {/* {!isAuthenticated && <Redirect from={''} to="/" noThrow />} */}
          {/* <NotFound default /> */}
          {(localStorage.refresh_token || isAuthenticated) && (
            <DashboardPage
              path={`${process.env.REACT_APP_RELATIVE_PATH}/catalogue`}
              // isSidebarOpen={isSidebarOpen}
              // setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
          {(localStorage.refresh_token || isAuthenticated) && (
            <ChooseDatePage
              path={`${process.env.REACT_APP_RELATIVE_PATH}/choose-date`}
              // isSidebarOpen={isSidebarOpen}
              // setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
          {isAuthenticated && (
            <StoreDetails
              path={`${process.env.REACT_APP_RELATIVE_PATH}/storeDetails`}
            />
          )}
          {isAuthenticated && (
            <Oda path={`${process.env.REACT_APP_RELATIVE_PATH}/oda`} />
          )}
          {(localStorage.refresh_token || isAuthenticated) && (
            <Basket path={`${process.env.REACT_APP_RELATIVE_PATH}/basket`} />
          )}
          {isAuthenticated && (
            <SilentRenew
              path={`${process.env.REACT_APP_RELATIVE_PATH}/silent_renew`}
            />
          )}
          {/* <PrivateRoute exact path="/" component={DashboardPage} /> */}
          {/* <Redirect from="*" to="/login" /> */}
        </Router>
        <ConfirmationModal />
        <Loader />
      </MuiThemeProvider>
    </StylesProvider>
  );
};
//   return (
//     <StylesProvider injectFirst>
//       <MuiThemeProvider theme={theme}>
//         <CssBaseline />
//         <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//         <Router style={{ height: '100%' }} primary={false} history={history}>
//           {/**Add Layout */}
//           {!isAuthenticated && (
//             <LoginPage path={`${process.env.REACT_APP_RELATIVE_PATH}/`} />
//           )}
//           {!isAuthenticated && (
//             <Register
//               path={`${process.env.REACT_APP_RELATIVE_PATH}/register`}
//             />
//           )}
//           {!isAuthenticated && (
//             <CallBackPage
//               path={`${process.env.REACT_APP_RELATIVE_PATH}/callback`}
//             />
//           )}
//           {/* {!isAuthenticated && <Redirect from={''} to="/" noThrow />} */}
//           {/* <NotFound default /> */}
//           {(localStorage.refresh_token || isAuthenticated) && (
//             <DashboardPage
//               path={`${process.env.REACT_APP_RELATIVE_PATH}/catalogue`}
//               isSidebarOpen={isSidebarOpen}
//               setIsSidebarOpen={setIsSidebarOpen}
//             />
//           )}
//           {isAuthenticated && (
//             <StoreDetails
//               path={`${process.env.REACT_APP_RELATIVE_PATH}/storeDetails`}
//             />
//           )}
//           {isAuthenticated && (
//             <Oda path={`${process.env.REACT_APP_RELATIVE_PATH}/oda`} />
//           )}
//           {isAuthenticated && (
//             <SilentRenew
//               path={`${process.env.REACT_APP_RELATIVE_PATH}/silent_renew`}
//             />
//           )}
//           {/* <PrivateRoute exact path="/" component={DashboardPage} /> */}
//           {/* <Redirect from="*" to="/login" /> */}
//         </Router>
//         <ConfirmationModal />
//         <Loader />
//       </MuiThemeProvider>
//     </StylesProvider>
//   );
// };

export default App;
