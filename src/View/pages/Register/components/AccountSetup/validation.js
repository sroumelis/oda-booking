import * as Yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\~`()*-_=+])(?=.{8,})/;

export default Yup.object().shape({
  email: Yup.string()
    .email("Invalid e-mail address entered")
    .required("This field is required"),
  password: Yup.string()
    .matches(passwordRegex, "Password must contain an uppercase character, a number and a special character. It should also have a length of at least 8 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
