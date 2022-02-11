import * as Yup from "yup";

const phoneRegex = /^[+0-9]+$/;
// const passwordRegex1 = /(?=.*[0-9])/;
const noSpecialCharactersRegex = /^(?!.*[!@#\$%\^&\~`()*-_=+]).*$/;

export default Yup.object().shape({
  // profilePictureBase64: Yup.string().required(
  // "Please select a profile picture"
  // ),
  firstname: Yup.string()
    .required("This field is required")
    // .matches(
    //   noSpecialCharactersRegex,
    //   "First Name should not have special characters or numbers"
    // )
    .test(
      "char-check",
      "First Name should not have special characters or numbers",
      function (val) {
        try {
          const parsedName = val.toLowerCase();
          return noSpecialCharactersRegex.test(parsedName || "");
        } catch (e) {
          return false;
        }
      }
    ),
  lastname: Yup.string()
    .required("This field is required")
    // .matches(
    //   noSpecialCharactersRegex,
    //   "Last Name should not have special characters or numbers"
    // )
    .test(
      "char-check",
      "Last Name should not have special characters or numbers",
      function (val) {
        try {
          const parsedName = val.toLowerCase();
          return noSpecialCharactersRegex.test(parsedName || "");
        } catch (e) {
          return false;
        }
      }
    ),
  mobile: Yup.string()
    .required("This field is required")
    .matches(phoneRegex, "Mobile must only contain numbers")
    .min(10, `Mobile must have at least 10 characters`)
    .max(20, `Mobile must have 20 characters at most`),
  // birthdate: Yup.date()
  //   .required("This field is required")
  //   .test("today-check", "Selected date can not be today's date", function (date) {
  //     const today = new Date();
  //     return (
  //       today.getDate() !== date.getDate() ||
  //       today.getMonth() !== date.getMonth() ||
  //       today.getFullYear() !== date.getFullYear()
  //     );
  //   }),
  receipts: Yup.array().of(
    Yup.object().shape({
      address: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      state: Yup.string().required("This field is required"),
      zipCode: Yup.string().required("This field is required"),
      // floor: Yup.string().required("This field is required"),
      // comment: Yup.string().required("This field is required"),
    })
  ),
  // invoices: Yup.array().of(
  //   Yup.object().shape({
  //     companyName: Yup.string().required("This field is required"),
  //     address: Yup.string().required("This field is required"),
  //     city: Yup.string().required("This field is required"),
  //     state: Yup.string().required("This field is required"),
  //     zipCode: Yup.string().required("This field is required"),
  //     floor: Yup.string().required("This field is required"),
  //     vat: Yup.string().required("This field is required").matches(phoneRegex, "VAT must only contain numbers"),
  //     doy: Yup.string().required("This field is required"),
  //     phone: Yup.string().required("This field is required").matches(phoneRegex, "Phone must only contain numbers"),
  //     comment: Yup.string().required("This field is required"),
  //   })
  // ),
});
