import * as yup from "yup";

const floatingNumber = /^[-+]?(\d*\.\d+|\d+\.?\d*)([eE][-+]?\d+)?$/;
// floating number
const integerNumber = /^-?\d+$/;
// integerNumber

export const createProduct = yup.object().shape({
  brand: yup.string().required("Required"),
  category: yup.string().required("Required"),
  subcategory: yup.string().required("Required"),
  nameEn: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  nameAr: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  descriptionEn: yup
    .string()
    .min(3, "At most 100 characters long")
    .required("Required"),
  descriptionAr: yup
    .string()
    .min(3, "At most 100 characters long")
    .required("Required"),
  images: yup
    .array()
    .of(yup.string())
    .min(1, "At least one image is required")
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
  // colors: yup
  //   .array()
  //   .of(yup.string()) // Assuming the array contains strings, you can adjust this type
  //   .min(1, "At least one color is required")
  //   .required("Required"),
  // sizes: yup
  //   .array()
  //   .of(yup.string())
  //   .min(1, "At least one size is required")
  //   .required("Required"),
  // stock: yup
  //   .string()
  //   .matches(integerNumber, { message: "Please create a number" })
  //   .required("Required"),
  // price: yup
  //   .string()
  //   .matches(floatingNumber, { message: "Please create a number" })
  //   .required("Required"),
  // oldPrice: yup
  //   .string()
  //   .matches(floatingNumber, { message: "Please create a number" })
  //   .required("Required"),
  barcode: yup
    .string()
    .min(2, "At least 3 characters long")
    .required("Required"),
  productReference: yup
    .string()
    .min(2, "At least 3 characters long")
    .required("Required"),
  new: yup.boolean(),
  sold: yup.boolean(),
  sale: yup.boolean(),
});
export const createProductInitialValues = {
  brand: "",
  category: "",
  subcategory: "",
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
  images: [],
  barcode: "",
  productReference: "",
  isActive: true,
  // colors: "",
  // sizes: [],
  // stock: "",
  // price: "",
  // oldPrice: "",
  barcode: "",
  productReference: "",
  // flags
  new: false,
  sold: false,
  sale: false,
};
