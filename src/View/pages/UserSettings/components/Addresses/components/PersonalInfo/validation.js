import * as Yup from "yup";

export default Yup.object().shape({
  address: Yup.string().required("This field is required"),
  city: Yup.string().required("This field is required"),
  state: Yup.string().required("This field is required"),
  zipCode: Yup.string().required("This field is required"),
  floor: Yup.string().required("This field is required"),
  comment: Yup.string().required("This field is required"),
});
