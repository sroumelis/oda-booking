import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { TextField, Button } from "../../../../../../common/components";
import validation from "./validation";
import { addAddress } from "../../../../../../../State/modules/address/add/actions";
import { fetchUserInfo } from "../../../../../../../State/modules/user/userInfo/actions";
import { setLoader } from "../../../../../../../State/modules/globalLoader/actions";
import { setModal } from "../../../../../../../State/modules/confirmationModal/actions";
import { locationQuery } from "../../../../../../../Utils/utilities";
import { Form, Formik } from "formik";

const CreateAddress = (props) => {
  const dispatch = useDispatch();
  const { setActivePage } = props;
  const [isAddressInitialized, setIsAddressInitialized] = React.useState(false);
  const [initialObj, setInitialObj] = React.useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    floor: "",
    comment: "",
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (lat && lng) {
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
                setInitialObj({
                  address:
                    results[0]?.address_components[1]?.long_name +
                    " " +
                    results[0]?.address_components[0]?.long_name,
                  city: results[0]?.address_components?.[2]?.long_name,
                  state: results[0]?.address_components?.[4]?.long_name,
                  zipCode: results[0]?.address_components?.[5]?.long_name,
                  floor: "",
                  comment: "",
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
  }, []);

  const [predictions, setPredictions] = React.useState({
    address: [],
    city: [],
    state: [],
    zipCode: [],
  });

  const handlePredictionSelection = async (e) => {
    const predictionsObj = await locationQuery(e);
    setPredictions(predictionsObj);
  };

  const _addAddress = async (data) => {
    let isCreated = false;
    try {
      dispatch(setLoader(true));
      console.log(data);
      const response = await dispatch(
        addAddress({
          address: {
            street: data?.address,
            city: data?.city,
            zipCode: data?.zipCode,
            comment: data?.comment,
            state: data?.state,
            // country: 'Ελλάδα',
            floor: data?.floor,
            type: 0,
          },
        })
      );
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content: "Address created succesfully!",
          title: "Success",
        })
      );
      setActivePage(0);
      isCreated = true;
      await dispatch(fetchUserInfo(true));
    } catch (e) {
      console.log(e);
      if (!isCreated) {
        dispatch(
          setModal({
            isVisible: true,
            hideCancelButton: true,
            content:
              "There was an error with creating the address. Please try again later",
            title: "Error",
          })
        );
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className={css(styles.fullHeight)}>
      {isAddressInitialized && (
        <Formik
          initialValues={initialObj}
          validationSchema={validation}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            _addAddress(values);
          }}
          render={({ values, handleChange, errors, setFieldValue }) => (
            <Form className={css(styles.form)}>
              <div>
                <span className={css(styles.instructionsText)}>
                  Add new Address
                </span>
                <div className={css(styles.normalRow)}>
                  <form autocomplete="off">
                    <TextField
                      value={values?.address}
                      onChange={(e) => {
                        handleChange(e);
                        handlePredictionSelection(e.target.value);
                      }}
                      name="address"
                      outerClassName={css(styles.textField)}
                      label="Address"
                      error={errors?.address || false}
                      predictions={predictions?.address}
                      setFieldValue={setFieldValue}
                    />
                  </form>
                </div>
                <div className={css(styles.twoInputsRow)}>
                  <form autocomplete="off">
                    <TextField
                      value={values?.city}
                      onChange={handleChange}
                      name="city"
                      outerClassName={css(styles.textField)}
                      label="City"
                      error={errors?.city || false}
                      predictions={predictions?.city}
                      setFieldValue={setFieldValue}
                    />
                  </form>
                  <form autocomplete="off">
                    <TextField
                      value={values?.state}
                      onChange={handleChange}
                      name="state"
                      outerClassName={css(styles.textField)}
                      label="State"
                      error={errors?.state || false}
                      predictions={predictions?.state}
                      setFieldValue={setFieldValue}
                    />
                  </form>
                </div>
                <div className={css(styles.twoInputsRow)}>
                  <form autocomplete="off">
                    <TextField
                      value={values?.zipCode}
                      onChange={handleChange}
                      name="zipCode"
                      outerClassName={css(styles.textField)}
                      label="Zip Code"
                      error={errors?.zipCode || false}
                      predictions={predictions?.zipCode}
                      setFieldValue={setFieldValue}
                    />
                  </form>
                  <TextField
                    value={values?.floor}
                    onChange={handleChange}
                    name="floor"
                    outerClassName={css(styles.textField)}
                    label="Floor"
                    error={errors?.floor || false}
                  />
                </div>
                <div className={css(styles.normalRow)}>
                  <TextField
                    value={values?.comment}
                    onChange={handleChange}
                    name="comment"
                    outerClassName={css(styles.textField)}
                    label="Comment"
                    error={errors?.comment || false}
                  />
                </div>
              </div>
              <div className={css(styles.twoButtons)}>
                <Button onClick={() => setActivePage(0)} type="button">
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </Form>
          )}
        />
      )}
    </div>
  );
};

const memoizedCreateAddress = React.memo(CreateAddress);
export { memoizedCreateAddress as CreateAddress };
