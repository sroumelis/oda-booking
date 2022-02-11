import * as Yup from "yup";

export default Yup.object().shape({
  cardHolderName: Yup.string().required("This field is required"),
  cardNumber: Yup.string()
    .required("This field is required")
    .test(
      "len",
      "Card number must be at least 14 characters",
      (val) => val.length >= 14
    ),
  expirationMonth: Yup.string()
    .test(
      "len",
      "Must be exactly 1 or 2 characters and between 1 and 12",
      (val) => {
        const parsedNum = parseInt(val);
        return (
          (parsedNum > 0 && parsedNum < 13 && val.length === 2) ||
          val.length === 1
        );
      }
    )
    .required("This field is required"),
  expirationYear: Yup.string()
    .test("len", "Must be exactly 2 characters", (val) => val.length === 2)
    .required("This field is required"),
  ccv: Yup.string()
    .test("len", "Must be exactly 3 characters", (val) => val.length === 3)
    .required("This field is required"),
});
