import * as yup from "yup";
const floatingNumber = /^[-+]?(\d*\.\d+|\d+\.?\d*)([eE][-+]?\d+)?$/;
// floating number
const integerNumber = /^-?\d+$/;
// integerNumber

export const shipping = yup.object().shape({
  pickupDueDate: yup.string().required("Required"),
  warehouseName: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  description: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  weight: yup
    .string()
    .matches(floatingNumber, "Must be a valid number")
    .min(3, "At least 3 characters long")
    .required("Required"),
  customerName: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  packageSerial: yup
    .string()
    .matches(floatingNumber, "Must be a valid number")
    .min(3, "At least 3 characters long")
    .required("Required"),
  customerPhone: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  buildingNo: yup
    .string()
    .matches(floatingNumber, "Must be a valid number")
    .min(3, "At least 3 characters long")
    .required("Required"),
  street: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  floorNo: yup
    .string()
    .matches(floatingNumber, "Must be a valid number")
    .min(3, "At least 3 characters long")
    .required("Required"),
  apartmentNo: yup
    .string()
    .matches(floatingNumber, "Must be a valid number")
    .min(3, "At least 3 characters long")
    .required("Required"),
  governorateCode: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  cityCode: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  district: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
  allowToOpenPackage: yup.boolean(),
  serviceDate: yup.string().required("Required"),
  notes: yup.string().min(3, "At least 3 characters long").required("Required"),
});
export const shippingInitialValues = {
  pickupDueDate: "",
  warehouseName: "",
  description: "",
  weight: "",
  customerName: "",
  packageSerial: "",
  customerPhone: "",
  buildingNo: "",
  street: "",
  floorNo: "",
  apartmentNo: "",
  governorateCode: "",
  cityCode: "",
  district: "",
  allowToOpenPackage: true,
  serviceDate: "",
  notes: "",
};

//   "items": [
//     {
//       "id": 0,
//       "weight": 0,
//       "category": "string",
//       "notes": "string"
//     }
//   ],
