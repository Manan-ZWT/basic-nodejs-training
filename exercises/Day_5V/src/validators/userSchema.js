import yup from "yup";

export const userCreateSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain alphabets and spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  age: yup
    .number()
    .integer("Age must be an integer")
    .min(1, "Age must be a positive integer")
    .required("Age is required"),
  role: yup
    .string()
    .oneOf(["Admin", "User"], "Not a valid role, enter a valid role")
    .required("Role is required"),
  isActive: yup.boolean().required("isActive must be a Boolean value"),
});

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
});

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
  // path: yup.string().url("Invalid path").nullable(),
});
