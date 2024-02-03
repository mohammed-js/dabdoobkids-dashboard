import * as yup from "yup";
const floatingNumber = /^[-+]?(\d*\.\d+|\d+\.?\d*)([eE][-+]?\d+)?$/;
// floating number
const integerNumber = /^-?\d+$/;
// integerNumber

export const updatePlan = yup.object().shape({
  nameEn: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  nameAr: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  subtitleEn: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  subtitleAr: yup
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
  isActive: yup.boolean(),
  price: yup
    .string()
    .matches(floatingNumber, { message: "Please create a number" })
    .required("Required"),
  duration: yup.string().required("Required"),
});
export const updatePlanInitialValues = {
  nameEn: "",
  nameAr: "",
  subtitleEn: "",
  subtitleAr: "",
  descriptionEn: "",
  descriptionAr: "",
  duration: "Monthly",
  isActive: true,
  price: "",
};
