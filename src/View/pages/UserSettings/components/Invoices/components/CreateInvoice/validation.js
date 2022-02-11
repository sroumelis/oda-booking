import * as Yup from "yup";

export default Yup.object().shape({
  companyName: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  city: Yup.string().required("This field is required"),
  state: Yup.string().required("This field is required"),
  zipCode: Yup.string().required("This field is required"),
  floor: Yup.string().required("This field is required"),
  vat: Yup.string().required("This field is required"),
  doy: Yup.string().required("This field is required"),
  phone: Yup.string().required("This field is required"),
  // comment: Yup.string().required("This field is required"),
});
