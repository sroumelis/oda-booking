import { createMuiTheme } from "@material-ui/core/styles";

const oda = createMuiTheme({
  palette: {
    typography: {
      // fontFamily:
      //   "-apple-system,system-ui,BlinkMacSystemFont," +
      //   '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      // fontFamily: "'calibri', sans-serif",
      fontFamily: "'ubuntu', sans-serif",
    },
    primary: {
      light: "#f9f9f9",
      main: "#4d4d4d",
      dark: "#4d4d4d",
      contrastText: "#f9f9f9",
    },
    secondary: {
      light: "#000",
      main: "#000",
      dark: "#000",
      contrastText: "#000",
    },
    error: {
      main: "#000",
      light: "#000",
      dark: "#000",
      contrastText: "#000",
    },
    divider: "#4d4d4d",
    action: {
      active: "#000",
      hover: "#000",
      selected: "#000",
      disabled: "#000",
      disabledBackground: "#000",
    },
    text: {
      primary: "#4d4d4d",
      secondary: "#4d4d4d",
      disabled: "#4d4d4d",
      hint: "#4d4d4d",
      icon: "#4d4d4d",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      main: "#0A226B",
    },
  },
  fonts: {
    // small: '12px',
    // normal: '14px',
    // large: '16px',
    // xlarge: '18px',
    // xxlarge: '22px',
    // profileInitialsSize: '60px',
    vsmall: "12px",
    small: "14px",
    normal: "16px",
    large: "18px",
    xlarge: "20px",
    xxlarge: "24px",
    profileInitialsSize: "62px",
  },
  lineHeights: {
    // small: '17px',
    // normal: '20px',
    // large: '22px',
    // xlarge: '25px',
    // xxlarge: '31px',
    // profileInitialsSize: '80px',
    vsmall: "17px",
    small: "19px",
    normal: "22px",
    large: "24px",
    xlarge: "27px",
    xxlarge: "34px",
    profileInitialsSize: "84px",
  },
  colors: {
    primary: "#253141",
    secondary: "#FAAD09",
    background: "#EDEDEE",
    surface: "#FCFCFC",
    onPrimary: "#E4DDC9",
    onBackground: "#121820",
    success: "#56a36e",
    warning: "#d39336",
    danger: "#F44336",
    odaColor: "#00FFFF",
    disabled: "#BFBFBF",
    backgroundSoft: "#F5F5F5",
    disabledLowOpacity: "rgba(191, 191, 191,.3)",
  },
  fontFamilies: {
    // normal: 'calibri',
    // labels: 'elegance',
    // odaText: 'aqua',
    // fancyButtons: 'quantify',

    normal: "ubuntu",
    labels: "ubuntu",
    odaText: "ubuntu",
    fancyButtons: "ubuntu",
  },
  commonColors: {
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },
  boxShadows: {
    faint: "3px 3px 6px rgb(0 0 0 / 10%)",
    normal: "5px 5px 10px rgb(0 0 0 / 15%)",
    strong: "10px 10px 15px rgb(0 0 0 / 15%)",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          width: "100%",
          height: "100%",
          // fontFamily: "'Roboto', sans-serif!important",
          fontFamily: "'ubuntu', sans-serif!important",
        },
        body: {
          // backgroundImage: `url(${Background})`,
          width: "100%",
          height: "100%",
          backgroundColor: "#EDEDEE",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
          overflow: "auto!important",
          // fontFamily: "calibri, sans-serif!important",
          fontFamily: "ubuntu, sans-serif!important",
          paddingRight: "unset!important",
        },
        ".MuiDialog-container.MuiDialog-scrollPaper ::-webkit-scrollbar,.MuiDialog-container.MuiDialog-scrollPaper ::-webkit-scrollbar-thumb":
          {
            display: "none",
          },
        // CUSTOM SCROLLBAR CSS
        "::-webkit-scrollbar": {
          width: 8,
        },
        /* Track */
        "::-webkit-scrollbar-track": {
          background: "#BFBFBF", // disabled color
        },
        /* Handle */
        "::-webkit-scrollbar-thumb": {
          background: "#253141", // primary
          // borderRadius: 4,
        },
        /* Handle on hover */
        "::-webkit-scrollbar-thumb:hover": {
          background: "#253141d9", // color primary with less opacity,
        },
        // END OF CUSTOM SCROLLBAR CSS
        "@media screen and (max-width: 768px)": {
          body: {
            backgroundColor: "#FCFCFC",
          },
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        ".carousel-root .control-arrow": {
          opacity: "1!important",
        },
        ".video-react": {
          paddingTop: "0!important",
          width: "100%!important",
          height: "auto!important",
          display: "flex",
          justifyContent: "center",
        },
        ".video-react-video": {
          width: "100%",
          pointerEvents: "none",
          maxWidth: 900,
          maxHeight: "55vh",
        },
        ".video-react-big-play-button": {
          display: "none",
        },
        ".video-react-control-bar": {
          display: "none",
        },
        "#payment-iframe-parent": {
          width: "100%",
          height: "100%",
          overflow: "auto",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "999998",
          backgroundColor: "rgba(0,0,0,.5)",
        },
        "#iframe-close-and-content": {
          width: "min(100vw, 500px)",
          height: "min(100vh, 700px)",
          overflow: "auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: "999999",
          display: "flex",
          flexDirection: "column",
        },
        "#payment-iframe": {
          width: "100%",
          height: "100%",
        },
        "@media only screen and (min-device-width : 1024px) and (max-device-width : 1366px) and (orientation : landscape)":
          {
            ".video-react-video": {
              maxWidth: 600,
            },
          },
        "@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)":
          {
            ".video-react-video": {
              maxWidth: 450,
            },
          },
        "@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)":
          {
            ".video-react-video": {
              maxWidth: 600,
              marginTop: 64,
            },
          },
      },
    },
  },
});

export default oda;
