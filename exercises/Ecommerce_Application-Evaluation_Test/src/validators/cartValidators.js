// IMPORTING YUP FOR DATA VALIDATION
import yup from "yup";

export const addtoCart = yup.object({
  user_id: yup
    .number("User id should be number")
    .required("User id is required"),

  product_id: yup
    .number("Product id should be number")
    .required("Product id is required"),

  quantity: yup.number("Quantity should be number").optional(),
});
