import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { navigate } from "@reach/router";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { Button, TextButton } from "../../common/components";
import { Wrapper, AccountSetup, PersonalInfo, StepsHeader } from "./components";
import { registerUser } from "../../../State/modules/user/registration/actions";
import { setLoader } from "../../../State/modules/globalLoader/actions";
import { setModal } from "../../../State/modules/confirmationModal/actions";
import userManager from "../../../Utils/userManager";
import {
  handleGeolocationObject,
  handleCurrentPositionObject,
} from "../../../Utils/utilities";

const Register = (props) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isAddressInitialized, setIsAddressInitialized] = React.useState(false);
  const [accountSetup, setAccountSetup] = React.useState({
    // email: 'dasdasdasd@asdasd.asd',
    // password: '1234Cc!@#$',
    // passwordConfirmation: '1234Cc!@#$',
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [personalInfo, setPersonalInfo] = React.useState({
    lastname: "",
    // birthdate: new Date(),
    profilePictureBase64: "",
    profilePictureName: "",
    mobile: "",
    receipts: [
      {
        address: "",
        city: "",
        state: "",
        zipCode: "",
        floor: "",
        comment: "",
      },
    ],
    // invoices: [
    //   {
    //     companyName: "",
    //     address: "",
    //     city: "",
    //     state: "",
    //     zipCode: "",
    //     floor: "",
    //     vat: "",
    //     doy: "",
    //     phone: "",
    //     comment: "",
    //   },
    // ],
  });
  React.useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          if (lat && lng && window.google) {
            var geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
              {
                latLng: {
                  lat,
                  lng,
                },
              },
              function (results, status) {
                if (status == window.google.maps.GeocoderStatus.OK) {
                  const parsedResults = handleCurrentPositionObject(
                    results[0]?.address_components || {}
                  );
                  console.log(parsedResults);
                  setPersonalInfo({
                    ...personalInfo,
                    receipts: [
                      {
                        address: parsedResults?.address,
                        city: parsedResults?.city,
                        state: parsedResults?.state,
                        zipCode: parsedResults?.zipCode,
                        floor: "",
                        comment: "",
                      },
                    ],
                  });
                  setIsAddressInitialized(true);
                }
              }
            );
          } else {
            setIsAddressInitialized(true);
          }
        },
        () => setIsAddressInitialized(true)
      );
    } catch (e) {
      console.log(e);
      setIsAddressInitialized(true);
    }
  }, []);

  const userRegister = async (registrationObj) => {
    // console.log(registrationObj);
    try {
      dispatch(setLoader(true));
      const requestObject = {
        name: registrationObj?.firstname + " " + registrationObj?.lastname,
        password: accountSetup?.password,
        confirmPassword: accountSetup?.passwordConfirmation,
        email: accountSetup?.email,
        floor: registrationObj?.receipts?.[0]?.floor, // mismatch with form
        notes: registrationObj?.receipts?.[0]?.comment, // mismatch with form
        addresses: [],
        phones: [
          {
            isPrimary: true,
            phone: registrationObj?.mobile, // what are the other phones? Do we fill from the invoices obj?
          },
        ],
        picture: {
          name: registrationObj?.profilePictureName || "",
          documentAsBase64:
            registrationObj?.profilePictureBase64?.split(",")?.[1] || "",
        },
        // where is the invoices?
        // Where is the upload image function?
        // Where is birthday?
      };
      // filling the addresses array of the request object
      for (let i = 0; i < registrationObj?.receipts?.length; i += 1) {
        requestObject.addresses.push({
          streetAndNo: registrationObj?.receipts?.[i]?.address, // are addresses the receipts? if so why is there a floor and notes field above?
          city: registrationObj?.receipts?.[i]?.city, // are addresses the receipts? if so why is there a floor and notes field above?
          floor: registrationObj?.receipts?.[i]?.floor, // are addresses the receipts? if so why is there a floor and notes field above?
          country: registrationObj?.receipts?.[i]?.state, // are addresses the receipts? if so why is there a floor and notes field above?
          postCode: registrationObj?.receipts?.[i]?.zipCode, // are addresses the receipts? if so why is there a floor and notes field above?
          comment: registrationObj?.receipts?.[i]?.comment,
        });
      }
      const data = await dispatch(registerUser(requestObject));
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content:
            "You have succesfully completed the registration form. Press ok to go back to the login page",
          title: "Success",
          okFunction: () =>
            // navigate(`/${process.env.REACT_APP_RELATIVE_PATH}/`),
            navigate(
              process.env.REACT_APP_RELATIVE_PATH
                ? `/${process.env.REACT_APP_RELATIVE_PATH}/`
                : `/`
            ),
        })
      );
    } catch (e) {
      // Customer already exists!
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content:
            e === "Customer already exists!"
              ? "This user already exists."
              : "An error occured during the registration process. Please try again",
          title: "Error",
        })
      );
      console.log(e);
    } finally {
      dispatch(setLoader(false));
      // navigate("/");
    }
  };

  const _redirectToLogin = async () => {
    userManager.signinRedirect();
  };

  return (
    <>
      <StepsHeader activeStep={activeStep} />
      <span className={css(styles.text)}>
        Follow the steps in order to register your account
      </span>
      {activeStep === 0 && (
        <AccountSetup
          accountSetup={accountSetup}
          setAccountSetup={setAccountSetup}
          setActiveStep={setActiveStep}
        />
      )}
      {isAddressInitialized && activeStep === 1 && (
        <PersonalInfo
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          userRegister={userRegister}
        />
      )}
      <div className={css(styles.loginTextbutton)}>
        <TextButton onClick={_redirectToLogin}>
          Already have an account? Move to the login page!
        </TextButton>
      </div>
      {/* {activeStep === 2 && (
        <Wrapper header="Press submit to submit the form">
          <Button onClick={userRegister}>Submit</Button>
        </Wrapper>
      )} */}
      <div className={css(styles.bottomPlaceholder)} />
    </>
  );
};

const memoizedRegister = React.memo(Register);
export { memoizedRegister as Register };
