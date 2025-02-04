// IMPORTING YUP FOR DATA VALIDATION
import yup from "yup";

// SCHEMA FOR VALIDATING USER DATA WHEN CREATING NEW USER FOR "users" TABLE
export const registerNewUserSchema = yup.object({
  first_name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain alphabets and spaces"),
  last_name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain alphabets and spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Password must contain at least one lowecase character, one uppercase character, one digit and one special character"
    ),
  role: yup
    .string()
    .transform((value) => value && value.toLowerCase())
    .oneOf(["admin", "customer"], "Not a valid role, enter a valid role")
    .required("Role is required"),
});

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Password must contain at least one lowecase character, one uppercase character, one digit and one special character"
    ),
});

//SCHEMA FOR VALIDATING EMAIL AND PASSWORD WHILE LOGIN
export const userLoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Password must contain at least one lowecase character, one uppercase character, one digit and one special character"
    ),
});

// SCHEMA FOR VALIDATING USER PROFILE DATA WHEN CREATING NEW USER PROFILE FOR "user_profiles" TABLE
export const userProfileCreateSchema = yup.object({
  userId: yup
    .number()
    .required("User ID is required")
    .positive("User ID must be a positive number"),
  bio: yup
    .string()
    .required("Bio is required")
    .max(500, "Bio cannot exceed 500 characters"),
  linkedInUrl: yup.string().url("Invalid LinkedIn URL format").nullable(),
  facebookUrl: yup.string().url("Invalid Facebook URL format").nullable(),
  instaUrl: yup.string().url("Invalid Instagram URL format").nullable(),
});

// SCHEMA FOR VALIDATING USER DATA WHEN UPDATING EXISTING USER FOR "users" TABLE
export const userUpdateSchema = yup.object({
  name: yup
    .string()
    .optional()
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: yup.string().optional().email("Invalid email format"),
  age: yup
    .number()
    .optional()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(1, "Age must be greater than 1"),
  role: yup
    .string()
    .optional()
    .oneOf(["Admin", "User"], "Role must be either Admin or User"),
  isActive: yup.boolean().optional(),
  password: yup
    .string()
    .optional()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Password must contain at least one lowecase character, one uppercase character, one digit and one special character"
    ),
});

// SCHEMA FOR VALIDATING USER FORM DATA FOR "user_forms" TABLE
export const userFormSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain alphabets and spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});
