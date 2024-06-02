import * as yup from "yup";

export const updateContent = yup.object().shape({
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
    .min(3, "At least 3 characters long")
    .required("Required"),
  descriptionAr: yup
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
export const updateContentInitialValues = {
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
  images: [],
  isActive: true,
};
