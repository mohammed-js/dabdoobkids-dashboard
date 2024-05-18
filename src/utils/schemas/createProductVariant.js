import * as yup from "yup";

const floatingNumber = /^[-+]?(\d*\.\d+|\d+\.?\d*)([eE][-+]?\d+)?$/;
// floating number
const integerNumber = /^-?\d+$/;
// integerNumber

export const createProductVariant = yup.object().shape({
  product: yup.string().required("Required"),
  color: yup.string().required("Required"),
  size: yup.string().required("Required"),
  stock: yup
    .string()
    .matches(integerNumber, { message: "Please create a number" })
    .required("Required"),
  price: yup
    .string()
    .matches(floatingNumber, { message: "Please create a number" })
    .required("Required"),
  oldPrice: yup
    .string()
    .matches(floatingNumber, { message: "Please create a number" })
    .required("Required"),
  barcode: yup
    .string()
    .min(2, "At least 3 characters long")
    .required("Required"),
  productReference: yup
    .string()
    .min(2, "At least 3 characters long")
    .required("Required"),
  isActive: yup.boolean(),
  // images: yup
  //   .array()
  //   .of(yup.string())
  //   .min(1, "At least one image is required")
  //   .required("Required"),
});
export const createProductVariantInitialValues = {
  product: "",
  color: "",
  size: "",
  stock: "",
  price: "",
  oldPrice: "",
  barcode: "",
  productReference: "",
  isActive: true,
  // images: [],
};
