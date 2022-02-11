import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import validation from "./validation";
import { TextField, Button } from "../../../../../../common/components";
import { addInvoice } from "../../../../../../../State/modules/invoice/add/actions";
import { fetchUserInfo } from "../../../../../../../State/modules/user/userInfo/actions";
import { setLoader } from "../../../../../../../State/modules/globalLoader/actions";
import { setModal } from "../../../../../../../State/modules/confirmationModal/actions";
import { Form, Formik } from "formik";
import { locationQuery } from "../../../../../../../Utils/utilities";
const CreateInvoice = (props) => {
  const dispatch = useDispatch();
  const { setActivePage, isOnAddressPage } = props;
  const [isAddressInitialized, setIsAddressInitialized] = React.useState(false);
  const [initialObj, setInitialObj] = React.useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    floor: "",
    vat: "",
    doy: "",
    phone: "",
    comment: "",
  });
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
                console.log("Geo", results[0]);
                console.log("geocoded_results", results[0]);
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
                  companyName: "",
                  vat: "",
                  doy: "",
                  phone: "",
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

  const _addInvoice = async (data) => {
    let isCreated = false;
    try {
      dispatch(setLoader(true));
      const response = await dispatch(
        addInvoice({
          invoice: {
            company: data?.companyName,
            address: data?.address,
            city: data?.city,
            state: data?.state,
            postCode: data?.zipCode,
            floor: data?.floor,
            telephone: data?.phone,
            vat: data?.vat,
            taxAuth: data?.doy,
            comment: data?.comment,
          },
        })
      );
      dispatch(
        setModal({
          isVisible: true,
          hideCancelButton: true,
          content: "Invoice created succesfully!",
          title: "Success",
        })
      );
      setActivePage(isOnAddressPage ? 3 : 0);
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
              "There was a problem with creating the new invoice. Please try again",
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
            _addInvoice(values);
          }}
          render={({ values, handleChange, errors, setFieldValue }) => (
            <Form className={css(styles.form)}>
              <div>
                <span className={css(styles.instructionsText)}>
                  Add new Invoice
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
                      setFieldValue={setFieldValue}
                      predictions={predictions?.address}
                      error={errors?.address || false}
                    />
                  </form>
                </div>
                <div className={css(styles.twoInputsRow)}>
                  <TextField
                    value={values?.companyName}
                    onChange={handleChange}
                    name="companyName"
                    outerClassName={css(styles.textField)}
                    label="Company Name"
                    error={errors?.companyName || false}
                  />
                  <TextField
                    value={values?.phone}
                    onChange={handleChange}
                    name="phone"
                    outerClassName={css(styles.textField)}
                    label="Phone"
                    error={errors?.phone || false}
                  />
                </div>
                <div className={css(styles.twoInputsRow)}>
                  <form autocomplete="off">
                    <TextField
                      value={values?.city}
                      onChange={handleChange}
                      setFieldValue={setFieldValue}
                      name="city"
                      outerClassName={css(styles.textField)}
                      label="City"
                      predictions={predictions?.city}
                      error={errors?.city || false}
                    />
                  </form>
                  <form autocomplete="off">
                    <TextField
                      value={values?.state}
                      onChange={handleChange}
                      setFieldValue={setFieldValue}
                      name="state"
                      outerClassName={css(styles.textField)}
                      label="State"
                      predictions={predictions?.state}
                      error={errors?.state || false}
                    />
                  </form>
                </div>
                <div className={css(styles.twoInputsRow)}>
                  <form autocomplete="off">
                    <TextField
                      value={values?.zipCode}
                      onChange={handleChange}
                      setFieldValue={setFieldValue}
                      name="zipCode"
                      predictions={predictions?.zipCode}
                      outerClassName={css(styles.textField)}
                      label="Zip Code"
                      error={errors?.zipCode || false}
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
                <div className={css(styles.twoInputsRow)}>
                  <TextField
                    value={values?.vat}
                    onChange={handleChange}
                    name="vat"
                    outerClassName={css(styles.textField)}
                    label="VAT"
                    error={errors?.vat || false}
                  />
                  <TextField
                    value={values?.doy}
                    onChange={handleChange}
                    name="doy"
                    outerClassName={css(styles.textField)}
                    label="Tax Authority"
                    error={errors?.doy || false}
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
                <Button
                  onClick={() => setActivePage(isOnAddressPage ? 3 : 0)}
                  type="button"
                >
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

const memoizedCreateInvoice = React.memo(CreateInvoice);
export { memoizedCreateInvoice as CreateInvoice };
