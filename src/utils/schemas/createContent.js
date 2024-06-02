import * as yup from "yup";

export const createContent = yup.object().shape({
  nameEn: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  nameAr: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  isActive: yup.boolean(),
});
export const createContentInitialValues = {
  nameEn: "",
  nameAr: "",
  isActive: true,
};
