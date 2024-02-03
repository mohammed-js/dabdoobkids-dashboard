import * as yup from "yup";

export const updateCategory = yup.object().shape({
  nameEn: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  nameAr: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  images: yup
    .array()
    .of(yup.string())
    .min(1, "At least one image is required")
    .required("Required"),
  isActive: yup.boolean(),
});
export const updateCategoryInitialValues = {
  nameEn: "",
  nameAr: "",
  images: [],
  isActive: true,
};
