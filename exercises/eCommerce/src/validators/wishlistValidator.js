// IMPORTING YUP FOR DATA VALIDATION
import yup from "yup";

export const addToWishlist = yup.object({
  user_id: yup
    .number("User id should be number")
    .required("User id is required"),

  product_id: yup
    .number("Product id should be number")
    .required("Product id is required"),
});
