import * as yup from "yup";

const floatingNumber = /^[-+]?(\d*\.\d+|\d+\.?\d*)([eE][-+]?\d+)?$/;
// floating number
const integerNumber = /^-?\d+$/;
// integerNumber

export const createUser = yup.object().shape({
  isActive: yup.boolean(),
  firstName: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  lastName: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  images: yup
    .array()
    .of(yup.string())
    .min(1, "At least one image is required")
    .required("Required"),
});
export const createUserInitialValues = {
  isActive: true,
  firstName: "",
  lastName: "",
  images: [],
};
