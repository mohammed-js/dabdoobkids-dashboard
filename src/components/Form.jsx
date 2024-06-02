import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { TwitterPicker } from "react-color";
import Switch from "@mui/material/Switch";
import {
  loginSchema,
  loginInitialValues,
} from "../utils/schemas/loginSchema.js";
import {
  createProduct,
  createProductInitialValues,
} from "../utils/schemas/createProduct.js";
import {
  updateProduct,
  updateProductInitialValues,
} from "../utils/schemas/updateProduct.js";
import {
  createProductVariant,
  createProductVariantInitialValues,
} from "../utils/schemas/createProductVariant.js";
import {
  updateProductVariant,
  updateProductVariantInitialValues,
} from "../utils/schemas/updateProductVariant.js";
import {
  createCategory,
  createCategoryInitialValues,
} from "../utils/schemas/createCategory.js";
import {
  updateCategory,
  updateCategoryInitialValues,
} from "../utils/schemas/updateCategory.js";
import {
  createCollection,
  createCollectionInitialValues,
} from "../utils/schemas/createCollection.js";
import {
  updateCollection,
  updateCollectionInitialValues,
} from "../utils/schemas/updateCollection.js";
import {
  createContent,
  createContentInitialValues,
} from "../utils/schemas/createContent.js";
import {
  updateContent,
  updateContentInitialValues,
} from "../utils/schemas/updateContent.js";
import {
  createSubCategory,
  createSubCategoryInitialValues,
} from "../utils/schemas/createSubCategory.js";
import {
  updateSubCategory,
  updateSubCategoryInitialValues,
} from "../utils/schemas/updateSubCategory.js";
import {
  createBrand,
  createBrandInitialValues,
} from "../utils/schemas/createBrand.js";
import {
  updateBrand,
  updateBrandInitialValues,
} from "../utils/schemas/updateBrand.js";
import {
  updateUser,
  updateUserInitialValues,
} from "../utils/schemas/updateUser.js";
import {
  createUser,
  createUserInitialValues,
} from "../utils/schemas/createUser.js";
import {
  updatePlan,
  updatePlanInitialValues,
} from "../utils/schemas/updatePlan.js";
import {
  createPlan,
  createPlanInitialValues,
} from "../utils/schemas/createPlan.js";
import { useFormik } from "formik";
import Loader from "./Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../utils/interceptor.js";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
export default function Form({
  type,
  setOpen,
  setForceUpdate,
  setData,
  setIsLoading,
  currentId,
}) {
  const theme = useTheme();

  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [customColors, setCustomColors] = useState([]);
  const [currentColor, setCurrentColor] = useState([]);
  // const [currentItem, setCurrentItem] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const sizes = ["sm", "m", "l", "xl", "xxl", "xxxl"];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  if (type == "product_update") {
  }
  const handleFileChange = (e) => {
    // **
    window.stop();
    setIsUploaded(false);
    setFieldValue("image", "");
    // **

    const file = e.target.files[0];
    console.log(e.target.files);
    setIsUploading(true);
    // **
    const promises = Array.from(e.target.files).map((file) => {
      return instance
        .post(
          "/files/single",
          {
            bucket: "Content",
            mime: "image/jpeg",
            isPublic: true,
            file: file,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(values.images);
          return response.data.data.url;
        })
        .catch((error) => {
          console.error("API Error:", error);
          setIsUploading(false);
          setFieldValue("image", "response.data.data.url");
        });
    });
    Promise.all(promises).then((res) => {
      console.log(res);
      setFieldValue("images", res);

      setIsUploading(false);
      setIsUploaded(true);
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    let endpoint;
    let body;
    let method;
    switch (type) {
      case "login":
        endpoint = "/auth/login";
        body = values;
        method = "post";
        break;
      case "product_create":
        endpoint = "/products";
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          isActive: values.isActive,
          colors: values.colors,
          sizes: values.sizes,
          brand: values.brand,
          category: values.category,
          subcategory: values.subcategory,
          images: values.images,
          stock: values.stock,
          price: values.price,
          oldPrice: values.oldPrice,
          metaRobot: ["string"],
          metaDescription: "string",
          barcode: values.barcode,
          productReference: values.productReference,
          extraInfo: {
            new: values.new,
            sold: values.sold,
            sale: values.sale,
          },
        };
        method = "post";
        break;
      case "product_update":
        endpoint = `/products/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          isActive: values.isActive,
          colors: values.colors,
          sizes: values.sizes,
          brand: values.brand,
          category: values.category,
          images: values.images,
          stock: values.stock,
          price: values.price,
          oldPrice: values.oldPrice,
          metaRobot: ["string"],
          metaDescription: "string",
          extraInfo: {
            new: values.new,
            sold: values.sold,
            sale: values.sale,
          },
        };
        method = "put";
        break;
      case "product_variant_create":
        endpoint = `/products/${values.product}/variant`;
        body = {
          color: values.color,
          size: values.size,
          images: values.images,
          stock: values.stock,
          price: values.price,
          oldPrice: values.oldPrice,
          metaRobot: ["string"],
          metaDescription: "string",
          barcode: values.barcode,
          productReference: values.productReference,
          isActive: values.isActive,
          extraInfo: {
            new: values.new,
            sold: values.sold,
            sale: values.sale,
          },
        };
        method = "post";
        break;
      case "product_variant_update":
        endpoint = `/products/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          isActive: values.isActive,
          colors: values.colors,
          sizes: values.sizes,
          brand: values.brand,
          category: values.category,
          images: values.images,
          stock: values.stock,
          price: values.price,
          oldPrice: values.oldPrice,
          metaRobot: ["string"],
          metaDescription: "string",
          extraInfo: {
            new: values.new,
            sold: values.sold,
            sale: values.sale,
          },
        };
        method = "put";
        break;
      case "collection_create":
        endpoint = "/collections";
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "post";
        break;
      case "collection_update":
        endpoint = `/collections/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "put";
        break;
      case "content_create":
        endpoint = "/collections";
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "post";
        break;
      case "content_update":
        endpoint = `/collections/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "put";
        break;
      case "category_create":
        endpoint = "/categories";
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "post";
        break;
      case "category_update":
        endpoint = `/categories/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "put";
        break;
      case "subcategory_create":
        endpoint = "/subcategories";
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          isActive: values.isActive,
          images: values.images,
          category: +values.category,
        };
        method = "post";
        break;
      case "subcategory_update":
        endpoint = `/subcategories/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          isActive: values.isActive,
          images: values.images,
          category: +values.category,
        };
        method = "put";
        break;
      case "brand_create":
        endpoint = "/brands";
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "post";
        break;
      case "brand_update":
        endpoint = `/brands/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          isActive: values.isActive,
          images: values.images,
        };
        method = "put";
        break;
      case "user_create":
        endpoint = "/users";
        body = {
          isActive: values.isActive,
          firstName: values.firstName,
          lastName: values.lastName,
          avatar: values.images[0],
        };
        method = "post";
        break;
      case "user_update":
        endpoint = `/users/${currentId}`;
        body = {
          isActive: values.isActive,
          firstName: values.firstName,
          lastName: values.lastName,
          avatar: values.images[0],
        };
        method = "put";
        break;
      case "plan_create":
        endpoint = "/plans";
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          subtitle: {
            en: values.subtitleEn,
            ar: values.subtitleAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          duration: values.duration,
          price: values.price,
          isActive: values.isActive,
          extraInfo: {},
        };
        method = "post";
        break;
      case "plan_update":
        endpoint = `/plans/${currentId}`;
        body = {
          name: {
            en: values.nameEn,
            ar: values.nameAr,
          },
          subtitle: {
            en: values.subtitleEn,
            ar: values.subtitleAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
          duration: values.duration,
          price: values.price,
          isActive: values.isActive,
          extraInfo: {},
        };
        method = "put";
        break;
      default:
    }

    await instance[method](endpoint, body)
      .then((response) => {
        // actions.resetForm();
        notifySuccess("Success!");
        if (
          type === "product_create" ||
          type === "product_update" ||
          type === "product_variant_create" ||
          type === "product_variant_update" ||
          type === "collection_create" ||
          type === "collection_update" ||
          type === "content_create" ||
          type === "content_update" ||
          type === "category_create" ||
          type === "category_update" ||
          type === "subcategory_create" ||
          type === "subcategory_update" ||
          type === "brand_create" ||
          type === "brand_update" ||
          type === "user_create" ||
          type === "user_update" ||
          type === "plan_create" ||
          type === "plan_update"
        ) {
          setData([]);
          setForceUpdate((prev) => !prev);
          setIsLoading(true);
          setOpen(false);
        }
        if (type === "login") {
          localStorage.setItem("access_token", response.data.data.accessToken);
          localStorage.setItem(
            "refresh_token",
            response.data.data.refreshToken
          );
          navigate("/products");
        }
      })
      .catch((error) => {
        notifyError(
          error.response?.data?.errors[0]?.message ||
            error.response?.data?.message
        );
      });
  };
  let initialValues;
  let schema;
  switch (type) {
    case "login":
      initialValues = loginInitialValues;
      schema = loginSchema;
      break;
    case "product_create":
      initialValues = createProductInitialValues;
      schema = createProduct;
      break;
    case "product_update":
      initialValues = updateProductInitialValues;
      schema = updateProduct;
      break;
    case "product_variant_create":
      initialValues = createProductVariantInitialValues;
      schema = createProductVariant;
      break;
    case "product_variant_update":
      initialValues = updateProductVariantInitialValues;
      schema = updateProductVariant;
      break;
    case "collection_create":
      initialValues = createCollectionInitialValues;
      schema = createCollection;
      break;
    case "collection_update":
      initialValues = updateCollectionInitialValues;
      schema = updateCollection;
      break;
    case "content_create":
      initialValues = createContentInitialValues;
      schema = createContent;
      break;
    case "content_update":
      initialValues = updateContentInitialValues;
      schema = updateContent;
      break;
    case "category_create":
      initialValues = createCategoryInitialValues;
      schema = createCategory;
      break;
    case "category_update":
      initialValues = updateCategoryInitialValues;
      schema = updateCategory;
      break;
    case "subcategory_update":
      initialValues = updateSubCategoryInitialValues;
      schema = updateSubCategory;
      break;
    case "subcategory_create":
      initialValues = createSubCategoryInitialValues;
      schema = createSubCategory;
      break;
    case "brand_create":
      initialValues = createBrandInitialValues;
      schema = createBrand;
      break;
    case "brand_update":
      initialValues = updateBrandInitialValues;
      schema = updateBrand;
      break;
    case "user_create":
      initialValues = createUserInitialValues;
      schema = createUser;
      break;
    case "user_update":
      initialValues = updateUserInitialValues;
      schema = updateUser;
      break;
    case "plan_create":
      initialValues = createPlanInitialValues;
      schema = createPlan;
      break;
    case "plan_update":
      initialValues = updatePlanInitialValues;
      schema = updatePlan;
      break;
    default:
  }
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit,
  });
  console.log(values);
  console.log(errors);
  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1000, // Auto close the notification after 3000 milliseconds (3 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const notifyError = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  function getStyles(name, sizes, theme) {
    return {
      fontWeight:
        sizes.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFieldValue(
      "sizes",
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    if (currentId) {
      if (type === "product_update") {
        instance
          .get(`products/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setCustomColors(res.colors);
            // setCurrentItem(response.data.data);
            setFieldValue("nameEn", res.name);
            setFieldValue("nameAr", res.name);
            setFieldValue("descriptionEn", res.description);
            setFieldValue("descriptionAr", res.description);
            setFieldValue("brand", res.brand.id);
            setFieldValue("category", res.category.id);
            setFieldValue("images", res.images);
            setFieldValue("isActive", true);
            setFieldValue("colors", res.colors);
            setFieldValue("sizes", res.sizes);
            setFieldValue("stock", res.stock);
            setFieldValue("price", res.price);
            setFieldValue("oldPrice", res.oldPrice);
            setFieldValue("new", res.extraInfo.new);
            setFieldValue("sold", res.extraInfo.sold);
            setFieldValue("sale", res.extraInfo.sale);
            console.log(values);
            console.log(errors);
            //
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
      if (type === "product_variant_update") {
        instance
          .get(`products/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setCustomColors(res.colors);
            // setCurrentItem(response.data.data);
            setFieldValue("nameEn", res.name);
            setFieldValue("nameAr", res.name);
            setFieldValue("descriptionEn", res.description);
            setFieldValue("descriptionAr", res.description);
            setFieldValue("brand", res.brand.id);
            setFieldValue("category", res.category.id);
            setFieldValue("images", res.images);
            setFieldValue("isActive", true);
            setFieldValue("colors", res.colors);
            setFieldValue("sizes", res.sizes);
            setFieldValue("stock", res.stock);
            setFieldValue("price", res.price);
            setFieldValue("oldPrice", res.oldPrice);
            setFieldValue("new", res.extraInfo.new);
            setFieldValue("sold", res.extraInfo.sold);
            setFieldValue("sale", res.extraInfo.sale);
            console.log(values);
            console.log(errors);
            //
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
      if (type === "collection_update") {
        instance
          .get(`collections/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setFieldValue("nameEn", res.name);
            setFieldValue("nameAr", res.name);
            setFieldValue("descriptionEn", res.description);
            setFieldValue("descriptionAr", res.description);
            setFieldValue("images", res.images);
            setFieldValue("isActive", true);
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
      if (type === "content_update") {
        instance
          .get(`contents/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setFieldValue("nameEn", res.name);
            setFieldValue("nameAr", res.name);
            setFieldValue("descriptionEn", res.description);
            setFieldValue("descriptionAr", res.description);
            setFieldValue("images", res.images);
            setFieldValue("isActive", true);
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
      if (type === "category_update") {
        instance
          .get(`categories/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setFieldValue("nameEn", res.name);
            setFieldValue("nameAr", res.name);
            setFieldValue("images", res.images);
            setFieldValue("isActive", true);
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
      if (type === "user_update") {
        instance
          .get(`users/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setFieldValue("firstName", res.firstName);
            setFieldValue("lastName", res.lastName);
            setFieldValue("images", [res.images]);
            setFieldValue("isActive", true);
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
      if (type === "brand_update") {
        instance
          .get(`brands/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setFieldValue("nameEn", res.name);
            setFieldValue("nameAr", res.name);
            setFieldValue("images", res.images);
            setFieldValue("isActive", true);
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
      if (type === "plan_update") {
        instance
          .get(`plans/${currentId}`, {
            params: {
              // all: true,
            },
          })
          .then((response) => {
            const res = response.data.data;
            console.log(response.data.data);
            setFieldValue("nameEn", res.name.en);
            setFieldValue("nameAr", res.name.ar);
            setFieldValue("subtitleEn", res.name.en);
            setFieldValue("subtitleAr", res.name.ar);
            setFieldValue("descriptionEn", res.description.en);
            setFieldValue("descriptionAr", res.description.ar);
            setFieldValue("isActive", true);
            setFieldValue("price", res.price);
            setFieldValue("duration", res.duration);
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      }
    }

    if (
      type == "product_create" ||
      type == "product_update" ||
      type == "product_variant_create" ||
      type == "product_variant_update" ||
      type == "subcategory_create" ||
      type == "subcategory_update"
    ) {
      instance
        .get("/products", {
          // params: { page: 1 },
        })
        .then((response) => {
          setProducts(response.data.data.products);
        })
        .catch((error) => {});
      instance
        .get("/categories", {
          // params: { page: 1 },
        })
        .then((response) => {
          setCategories(response.data.data.categories);
        })
        .catch((error) => {});
      instance
        .get("/subcategories", {
          // params: { page: 1 },
        })
        .then((response) => {
          setSubcategories(response.data.data.categories);
        })
        .catch((error) => {});
      instance
        .get("/brands", {
          // params: { page: 1 },
        })
        .then((response) => {
          setBrands(response.data.data.brands);
        })
        .catch((error) => {});
    }
  }, []);
  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
      style={{ overflow: "auto", maxHeight: "500px" }}
    >
      {type === "login" && (
        <>
          <div className={styles.title}>Hi admin, Please log in!</div>
          {/* email */}
          <div className={styles.label}>
            <span>Email</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your email"
          ></input>

          {/* password */}
          <div className={styles.label}>
            <span>Password</span>
            <span className={styles.error}> *</span>
            {errors.password && touched.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <input
            placeholder="Your password"
            value={values.password}
            onChange={handleChange}
            id="password"
            type="password"
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
          ></input>

          <button className={styles.brown_button}>Login</button>
        </>
      )}
      {type === "product_create" && (
        <>
          <div className={styles.title}>Create an Account</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionEn */}
          <div className={styles.label}>
            <span>English description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionEn && touched.descriptionEn && (
              <span className="error">{errors.descriptionEn}</span>
            )}
          </div>
          <input
            value={values.descriptionEn}
            onChange={handleChange}
            id="descriptionEn"
            type="descriptionEn"
            onBlur={handleBlur}
            className={
              errors.descriptionEn && touched.descriptionEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionAr */}
          <div className={styles.label}>
            <span>Arabic description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionAr && touched.descriptionAr && (
              <span className="error">{errors.descriptionAr}</span>
            )}
          </div>
          <input
            value={values.descriptionAr}
            onChange={handleChange}
            id="descriptionAr"
            type="descriptionAr"
            onBlur={handleBlur}
            className={
              errors.descriptionAr && touched.descriptionAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* brand */}
          <div className={styles.label}>
            <span>Brand</span>
            <span className={styles.error}> *</span>
            {errors.brand && touched.brand && (
              <span className="error">{errors.brand}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.brand}
            onChange={(e) => {
              setFieldValue("brand", e.target.value);
            }}
            className={errors.brand && touched.brand ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem value={brand.id}>{brand.name}</MenuItem>
            ))}
          </Select>
          {/* category */}
          <div className={styles.label}>
            <span>Category</span>
            <span className={styles.error}> *</span>
            {errors.category && touched.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.category}
            onChange={(e) => {
              console.log(e.target.value);
              setFieldValue("category", e.target.value);
            }}
            className={errors.category && touched.category ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
          {/* subcategory */}
          <div className={styles.label}>
            <span>Subcategory</span>
            <span className={styles.error}> *</span>
            {errors.subcategory && touched.subcategory && (
              <span className="error">{errors.subcategory}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.subcategory}
            onChange={(e) => {
              console.log(e.target.value);
              setFieldValue("subcategory", e.target.value);
            }}
            className={
              errors.subcategory && touched.subcategory ? `error-pick` : ``
            }
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subcategories.map((subcategory) => (
              <MenuItem value={subcategory.id}>{subcategory.name}</MenuItem>
            ))}
          </Select>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>
          {/* new checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>New filter</span>
              {errors.new && touched.new && (
                <span className="error">{errors.new}</span>
              )}
            </div>
            <input
              id="new"
              type="checkbox"
              value={values.new}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.new && touched.new ? "input-error" : ""}
            />
          </div>
          {/* sold checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>Sold filter</span>
              {errors.sold && touched.sold && (
                <span className="error">{errors.sold}</span>
              )}
            </div>
            <input
              id="sold"
              type="checkbox"
              value={values.sold}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sold && touched.sold ? "input-error" : ""}
            />
          </div>
          {/* sale checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>Sale filter</span>
              {errors.sale && touched.sale && (
                <span className="error">{errors.sale}</span>
              )}
            </div>
            <input
              id="sale"
              type="checkbox"
              value={values.sale}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sale && touched.sale ? "input-error" : ""}
            />
          </div>

          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "product_update" && (
        <>
          <div className={styles.title}>Create an Account</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionEn */}
          <div className={styles.label}>
            <span>English description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionEn && touched.descriptionEn && (
              <span className="error">{errors.descriptionEn}</span>
            )}
          </div>
          <input
            value={values.descriptionEn}
            onChange={handleChange}
            id="descriptionEn"
            type="descriptionEn"
            onBlur={handleBlur}
            className={
              errors.descriptionEn && touched.descriptionEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionAr */}
          <div className={styles.label}>
            <span>Arabic description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionAr && touched.descriptionAr && (
              <span className="error">{errors.descriptionAr}</span>
            )}
          </div>
          <input
            value={values.descriptionAr}
            onChange={handleChange}
            id="descriptionAr"
            type="descriptionAr"
            onBlur={handleBlur}
            className={
              errors.descriptionAr && touched.descriptionAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* brand */}
          <div className={styles.label}>
            <span>Brand</span>
            <span className={styles.error}> *</span>
            {errors.brand && touched.brand && (
              <span className="error">{errors.brand}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.brand}
            onChange={(e) => {
              setFieldValue("brand", e.target.value);
            }}
            className={errors.brand && touched.brand ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem value={brand.id}>{brand.name}</MenuItem>
            ))}
          </Select>
          {/* category */}
          <div className={styles.label}>
            <span>Category</span>
            <span className={styles.error}> *</span>
            {errors.category && touched.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.category}
            onChange={(e) => {
              console.log(e.target.value);
              setFieldValue("category", e.target.value);
            }}
            className={errors.category && touched.category ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.imageId && touched.imageId && (
              <span className="error">{errors.imageId}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>
          {/* new checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>New filter</span>
              {errors.new && touched.new && (
                <span className="error">{errors.new}</span>
              )}
            </div>
            <input
              id="new"
              type="checkbox"
              value={values.new}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.new && touched.new ? "input-error" : ""}
            />
          </div>
          {/* sold checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>Sold filter</span>
              {errors.sold && touched.sold && (
                <span className="error">{errors.sold}</span>
              )}
            </div>
            <input
              id="sold"
              type="checkbox"
              value={values.sold}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sold && touched.sold ? "input-error" : ""}
            />
          </div>
          {/* sale checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>Sale filter</span>
              {errors.sale && touched.sale && (
                <span className="error">{errors.sale}</span>
              )}
            </div>
            <input
              id="sale"
              type="checkbox"
              value={values.sale}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sale && touched.sale ? "input-error" : ""}
            />
          </div>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "product_variant_create" && (
        <>
          <div className={styles.title}>Create a product variant</div>

          {/* products */}
          <div className={styles.label}>
            <span>Product</span>
            <span className={styles.error}> *</span>
            {errors.product && touched.product && (
              <span className="error">{errors.product}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.product}
            onChange={(e) => {
              setFieldValue("product", e.target.value);
            }}
            className={errors.product && touched.product ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {products.map((product) => (
              <MenuItem value={product.id}>{product.name}</MenuItem>
            ))}
          </Select>
          {/* color */}
          <div className={styles.label}>
            <span>Pick a color</span>
            <span className={styles.error}> *</span>
            {errors.color && touched.color && (
              <span className="error">{errors.color}</span>
            )}
          </div>
          <div
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <input
              type="text"
              value={values.color}
              onChange={(e) => {
                setFieldValue("color", e.target.value);
              }}
              style={{ width: "100px", fontSize: "15px" }}
              className={
                errors.colors && touched.colors
                  ? `${styles.input} input-error`
                  : `${styles.input}`
              }
            ></input>

            <div
              style={{
                // padding: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  backgroundColor: values.color,
                  border: "1px solid black",
                }}
              ></div>
            </div>
          </div>
          {/* size */}
          <div className={styles.label}>
            <span>Pick a size</span>
            <span className={styles.error}> *</span>
            {errors.size && touched.size && (
              <span className="error">{errors.size}</span>
            )}
          </div>
          <FormControl size="small">
            <InputLabel id="demo-multiple-name-label">Sizes</InputLabel>
            <Select
              className={errors.size && touched.size ? "error-pick" : "initial"}
              sx={{ borderRadius: "8px" }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              // multiple
              value={values.size}
              onChange={(e) => {
                setFieldValue("size", e.target.value);
              }}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* stock */}
          <div className={styles.label}>
            <span>Stock number</span>
            <span className={styles.error}> *</span>
            {errors.stock && touched.stock && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.stock}
            onChange={handleChange}
            id="stock"
            type="number"
            onBlur={handleBlur}
            className={
              errors.stock && touched.stock
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Stock number"
          ></input>
          {/* price */}
          <div className={styles.label}>
            <span>Price</span>
            <span className={styles.error}> *</span>
            {errors.price && touched.price && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.price}
            onChange={handleChange}
            id="price"
            type="number"
            onBlur={handleBlur}
            className={
              errors.price && touched.price
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Price number"
          ></input>
          {/* old price */}
          <div className={styles.label}>
            <span>Old price</span>
            <span className={styles.error}> *</span>
            {errors.oldPrice && touched.oldPrice && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.oldPrice}
            onChange={handleChange}
            id="oldPrice"
            type="number"
            onBlur={handleBlur}
            className={
              errors.oldPrice && touched.oldPrice
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Old price number"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* barcode */}
          <div className={styles.label}>
            <span>Barcode</span>
            <span className={styles.error}> *</span>
            {errors.barcode && touched.barcode && (
              <span className="error">{errors.barcode}</span>
            )}
          </div>
          <input
            value={values.barcode}
            onChange={handleChange}
            id="barcode"
            onBlur={handleBlur}
            className={
              errors.barcode && touched.barcode
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Barcode"
          ></input>
          {/* productReference */}
          <div className={styles.label}>
            <span>ProductReference</span>
            <span className={styles.error}> *</span>
            {errors.productReference && touched.productReference && (
              <span className="error">{errors.productReference}</span>
            )}
          </div>
          <input
            value={values.productReference}
            onChange={handleChange}
            id="productReference"
            onBlur={handleBlur}
            className={
              errors.productReference && touched.productReference
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Product Reference"
          ></input>
          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "product_variant_update" && (
        <>
          <div className={styles.title}>Create an Account</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionEn */}
          <div className={styles.label}>
            <span>English description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionEn && touched.descriptionEn && (
              <span className="error">{errors.descriptionEn}</span>
            )}
          </div>
          <input
            value={values.descriptionEn}
            onChange={handleChange}
            id="descriptionEn"
            type="descriptionEn"
            onBlur={handleBlur}
            className={
              errors.descriptionEn && touched.descriptionEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionAr */}
          <div className={styles.label}>
            <span>Arabic description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionAr && touched.descriptionAr && (
              <span className="error">{errors.descriptionAr}</span>
            )}
          </div>
          <input
            value={values.descriptionAr}
            onChange={handleChange}
            id="descriptionAr"
            type="descriptionAr"
            onBlur={handleBlur}
            className={
              errors.descriptionAr && touched.descriptionAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* brand */}
          <div className={styles.label}>
            <span>Brand</span>
            <span className={styles.error}> *</span>
            {errors.brand && touched.brand && (
              <span className="error">{errors.brand}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.brand}
            onChange={(e) => {
              setFieldValue("brand", e.target.value);
            }}
            className={errors.brand && touched.brand ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem value={brand.id}>{brand.name}</MenuItem>
            ))}
          </Select>
          {/* category */}
          <div className={styles.label}>
            <span>Category</span>
            <span className={styles.error}> *</span>
            {errors.category && touched.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.category}
            onChange={(e) => {
              console.log(e.target.value);
              setFieldValue("category", e.target.value);
            }}
            className={errors.category && touched.category ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
          {/* colors */}
          <div className={styles.label}>
            <span>Pick colors</span>
            <span className={styles.error}> *</span>
            {errors.colors && touched.colors && (
              <span className="error">{errors.colors}</span>
            )}
          </div>
          <div
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <input
              type="text"
              value={currentColor}
              onChange={(e) => {
                setCurrentColor(e.target.value);
              }}
              style={{ width: "100px", fontSize: "15px" }}
              className={
                errors.email && touched.email
                  ? `${styles.input} error-pick`
                  : `${styles.input}`
              }
            ></input>
            <button
              type="button"
              disabled={currentColor.length != 7}
              onClick={() => {
                setCustomColors((prev) => [...prev, currentColor]);
                setFieldValue("colors", [...customColors, currentColor]);
              }}
              style={{
                height: "100%",
                padding: "5px",
                borderRadius: "8px",
                backgroundColor: "var(--brown)",
                color: "var(--white)",
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <div
              style={{
                // padding: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {customColors.map((item) => (
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    backgroundColor: item,
                    border: "1px solid black",
                  }}
                  onClick={() => {
                    setCustomColors((prev) => {
                      return prev.filter((color) => color !== item);
                    });
                    setFieldValue(
                      "colors",
                      customColors.filter((color) => color !== item)
                    );
                  }}
                ></div>
              ))}
            </div>
          </div>
          {/* sizes */}
          <div className={styles.label}>
            <span>Pick sizes</span>
            <span className={styles.error}> *</span>
            {errors.sizes && touched.sizes && (
              <span className="error">{errors.sizes}</span>
            )}
          </div>
          <FormControl size="small">
            <InputLabel id="demo-multiple-name-label">Sizes</InputLabel>
            <Select
              className={
                errors.sizes && touched.sizes ? "error-pick" : "initial"
              }
              sx={{ borderRadius: "8px" }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={values.sizes}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {sizes.map((size) => (
                <MenuItem
                  key={size}
                  value={size}
                  style={getStyles(size, values.sizes, theme)}
                >
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* stock */}
          <div className={styles.label}>
            <span>Stock number</span>
            <span className={styles.error}> *</span>
            {errors.stock && touched.stock && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.stock}
            onChange={handleChange}
            id="stock"
            type="number"
            onBlur={handleBlur}
            className={
              errors.stock && touched.stock
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Stock number"
          ></input>
          {/* price */}
          <div className={styles.label}>
            <span>Price</span>
            <span className={styles.error}> *</span>
            {errors.price && touched.price && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.price}
            onChange={handleChange}
            id="price"
            type="number"
            onBlur={handleBlur}
            className={
              errors.price && touched.price
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Price number"
          ></input>
          {/* old price */}
          <div className={styles.label}>
            <span>Old price</span>
            <span className={styles.error}> *</span>
            {errors.oldPrice && touched.oldPrice && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.oldPrice}
            onChange={handleChange}
            id="oldPrice"
            type="number"
            onBlur={handleBlur}
            className={
              errors.oldPrice && touched.oldPrice
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Old price number"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.imageId && touched.imageId && (
              <span className="error">{errors.imageId}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>
          {/* new checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>New filter</span>
              {errors.new && touched.new && (
                <span className="error">{errors.new}</span>
              )}
            </div>
            <input
              id="new"
              type="checkbox"
              value={values.new}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.new && touched.new ? "input-error" : ""}
            />
          </div>
          {/* sold checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>Sold filter</span>
              {errors.sold && touched.sold && (
                <span className="error">{errors.sold}</span>
              )}
            </div>
            <input
              id="sold"
              type="checkbox"
              value={values.sold}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sold && touched.sold ? "input-error" : ""}
            />
          </div>
          {/* sale checkbox */}
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <div className={styles.label}>
              <span>Sale filter</span>
              {errors.sale && touched.sale && (
                <span className="error">{errors.sale}</span>
              )}
            </div>
            <input
              id="sale"
              type="checkbox"
              value={values.sale}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sale && touched.sale ? "input-error" : ""}
            />
          </div>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "collection_create" && (
        <>
          <div className={styles.title}>Create a collection</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionEn */}
          <div className={styles.label}>
            <span>English Description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionEn && touched.descriptionEn && (
              <span className="error">{errors.descriptionEn}</span>
            )}
          </div>
          <input
            value={values.descriptionEn}
            onChange={handleChange}
            id="descriptionEn"
            type="descriptionEn"
            onBlur={handleBlur}
            className={
              errors.descriptionEn && touched.descriptionEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionAr */}
          <div className={styles.label}>
            <span>Arabic Description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionAr && touched.descriptionAr && (
              <span className="error">{errors.descriptionAr}</span>
            )}
          </div>
          <input
            value={values.descriptionAr}
            onChange={handleChange}
            id="descriptionAr"
            type="descriptionAr"
            onBlur={handleBlur}
            className={
              errors.descriptionAr && touched.descriptionAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "collection_update" && (
        <>
          <div className={styles.title}>Update a collection</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "content_create" && (
        <>
          <div className={styles.title}>Create a content</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionEn */}
          <div className={styles.label}>
            <span>English Description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionEn && touched.descriptionEn && (
              <span className="error">{errors.descriptionEn}</span>
            )}
          </div>
          <input
            value={values.descriptionEn}
            onChange={handleChange}
            id="descriptionEn"
            type="descriptionEn"
            onBlur={handleBlur}
            className={
              errors.descriptionEn && touched.descriptionEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionAr */}
          <div className={styles.label}>
            <span>Arabic Description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionAr && touched.descriptionAr && (
              <span className="error">{errors.descriptionAr}</span>
            )}
          </div>
          <input
            value={values.descriptionAr}
            onChange={handleChange}
            id="descriptionAr"
            type="descriptionAr"
            onBlur={handleBlur}
            className={
              errors.descriptionAr && touched.descriptionAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "content_update" && (
        <>
          <div className={styles.title}>Update a collection</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "category_create" && (
        <>
          <div className={styles.title}>Create a category</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "category_update" && (
        <>
          <div className={styles.title}>Update a category</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "subcategory_create" && (
        <>
          <div className={styles.title}>Create a Subcategory</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>
          {/* category */}
          <div className={styles.label}>
            <span>Category</span>
            <span className={styles.error}> *</span>
            {errors.category && touched.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.category}
            onChange={(e) => {
              console.log(e.target.value);
              setFieldValue("category", e.target.value);
            }}
            className={errors.category && touched.category ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>Choose a category</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>

          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "subcategory_update" && (
        <>
          <div className={styles.title}>Update a Subcategory</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>
          {/* category */}
          <div className={styles.label}>
            <span>Category</span>
            <span className={styles.error}> *</span>
            {errors.category && touched.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <Select
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.category}
            onChange={(e) => {
              console.log(e.target.value);
              setFieldValue("category", e.target.value);
            }}
            className={errors.category && touched.category ? `error-pick` : ``}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>Choose a category</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "brand_create" && (
        <>
          <div className={styles.title}>Create a brands</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />

          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "brand_update" && (
        <>
          <div className={styles.title}>Update a brand</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload file</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "user_create" && (
        <>
          <div className={styles.title}>Create a user</div>

          {/* firstName */}
          <div className={styles.label}>
            <span>First Name</span>
            <span className={styles.error}> *</span>
            {errors.firstName && touched.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <input
            value={values.firstName}
            onChange={handleChange}
            id="firstName"
            type="firstName"
            onBlur={handleBlur}
            className={
              errors.firstName && touched.firstName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* lastName */}
          <div className={styles.label}>
            <span>Last name</span>
            <span className={styles.error}> *</span>
            {errors.lastName && touched.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <input
            value={values.lastName}
            onChange={handleChange}
            id="lastName"
            type="lastName"
            onBlur={handleBlur}
            className={
              errors.lastName && touched.lastName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.isActive && touched.isActive && (
              <span className="error">{errors.isActive}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />

          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload avatar</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "user_update" && (
        <>
          <div className={styles.title}>Update a user</div>

          {/* firstName */}
          <div className={styles.label}>
            <span>First name</span>
            <span className={styles.error}> *</span>
            {errors.firstName && touched.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <input
            value={values.firstName}
            onChange={handleChange}
            id="firstName"
            type="firstName"
            onBlur={handleBlur}
            className={
              errors.firstName && touched.firstName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* lastName */}
          <div className={styles.label}>
            <span>Last name</span>
            <span className={styles.error}> *</span>
            {errors.lastName && touched.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <input
            value={values.lastName}
            onChange={handleChange}
            id="lastName"
            type="lastName"
            onBlur={handleBlur}
            className={
              errors.lastName && touched.lastName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* status */}
          <div className={styles.label}>
            <span>Active status</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <Switch
            checked={values.isActive}
            onClick={(event) => {
              console.log(event.target.checked);
              setFieldValue("isActive", !values.isActive);
            }}
            id="isActive"
            type="isActive"
            // onBlur={handleBlur}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* upload image*/}
          <div className={styles.label}>
            <span>Upload avatar</span>
            <span className={styles.error}> *</span>
            {errors.images && touched.images && (
              <span className="error">{errors.images}</span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <label
              style={{
                opacity: isUploading ? ".3" : "initial",
                pointerEvents: isUploading ? "none" : "initial",
                cursor: isUploading ? "not-allowed" : "pointer",
              }}
            >
              {/* <img src="/upload.png" width="30px" /> */}
              <input
                multiple
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{ width: "180px" }}
              />
            </label>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUploading && <CircularProgress size="20px" />}
              {isUploaded && <CloudDoneIcon sx={{ color: "green" }} />}
            </Box>
          </div>

          <button className={styles.brown_button} type="submit">
            Update
          </button>
        </>
      )}
      {type === "plan_create" && (
        <>
          <div className={styles.title}>Create an Plan</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* subtitleEn */}
          <div className={styles.label}>
            <span>English Subtitle</span>
            <span className={styles.error}> *</span>
            {errors.subtitleEn && touched.subtitleEn && (
              <span className="error">{errors.subtitleEn}</span>
            )}
          </div>
          <input
            value={values.subtitleEn}
            onChange={handleChange}
            id="subtitleEn"
            type="subtitleEn"
            onBlur={handleBlur}
            className={
              errors.subtitleEn && touched.subtitleEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* subtitleAr */}
          <div className={styles.label}>
            <span>Arabic Subtitle</span>
            <span className={styles.error}> *</span>
            {errors.subtitleAr && touched.subtitleAr && (
              <span className="error">{errors.subtitleAr}</span>
            )}
          </div>
          <input
            value={values.subtitleAr}
            onChange={handleChange}
            id="subtitleAr"
            type="subtitleAr"
            onBlur={handleBlur}
            className={
              errors.subtitleAr && touched.subtitleAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionEn */}
          <div className={styles.label}>
            <span>English description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionEn && touched.descriptionEn && (
              <span className="error">{errors.descriptionEn}</span>
            )}
          </div>
          <input
            value={values.descriptionEn}
            onChange={handleChange}
            id="descriptionEn"
            type="descriptionEn"
            onBlur={handleBlur}
            className={
              errors.descriptionEn && touched.descriptionEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionAr */}
          <div className={styles.label}>
            <span>Arabic description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionAr && touched.descriptionAr && (
              <span className="error">{errors.descriptionAr}</span>
            )}
          </div>
          <input
            value={values.descriptionAr}
            onChange={handleChange}
            id="descriptionAr"
            type="descriptionAr"
            onBlur={handleBlur}
            className={
              errors.descriptionAr && touched.descriptionAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* price */}
          <div className={styles.label}>
            <span>Price</span>
            <span className={styles.error}> *</span>
            {errors.price && touched.price && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.price}
            onChange={handleChange}
            id="price"
            type="number"
            onBlur={handleBlur}
            className={
              errors.price && touched.price
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Price number"
          ></input>
          {/* duration */}
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small"> */}
          <div className={styles.label}>
            <span>Duration</span>
            <span className={styles.error}> *</span>
            {errors.duration && touched.duration && (
              <span className="error">{errors.duration}</span>
            )}
          </div>
          <Select
            id="duration"
            value={values.duration}
            onChange={(e) => {
              setFieldValue("duration", e.target.value);
            }}
            size="small"
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Annually">Annually</MenuItem>
            <MenuItem value="AllTime">AllTime</MenuItem>
          </Select>
          {/* </FormControl> */}
          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      {type === "plan_update" && (
        <>
          <div className={styles.title}>Update an Plan</div>

          {/* nameEn */}
          <div className={styles.label}>
            <span>English name</span>
            <span className={styles.error}> *</span>
            {errors.nameEn && touched.nameEn && (
              <span className="error">{errors.nameEn}</span>
            )}
          </div>
          <input
            value={values.nameEn}
            onChange={handleChange}
            id="nameEn"
            type="nameEn"
            onBlur={handleBlur}
            className={
              errors.nameEn && touched.nameEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* nameAr */}
          <div className={styles.label}>
            <span>Arabic name</span>
            <span className={styles.error}> *</span>
            {errors.nameAr && touched.nameAr && (
              <span className="error">{errors.nameAr}</span>
            )}
          </div>
          <input
            value={values.nameAr}
            onChange={handleChange}
            id="nameAr"
            type="nameAr"
            onBlur={handleBlur}
            className={
              errors.nameAr && touched.nameAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* subtitleEn */}
          <div className={styles.label}>
            <span>English Subtitle</span>
            <span className={styles.error}> *</span>
            {errors.subtitleEn && touched.subtitleEn && (
              <span className="error">{errors.subtitleEn}</span>
            )}
          </div>
          <input
            value={values.subtitleEn}
            onChange={handleChange}
            id="subtitleEn"
            type="subtitleEn"
            onBlur={handleBlur}
            className={
              errors.subtitleEn && touched.subtitleEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* subtitleAr */}
          <div className={styles.label}>
            <span>Arabic Subtitle</span>
            <span className={styles.error}> *</span>
            {errors.subtitleAr && touched.subtitleAr && (
              <span className="error">{errors.subtitleAr}</span>
            )}
          </div>
          <input
            value={values.subtitleAr}
            onChange={handleChange}
            id="subtitleAr"
            type="subtitleAr"
            onBlur={handleBlur}
            className={
              errors.subtitleAr && touched.subtitleAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionEn */}
          <div className={styles.label}>
            <span>English description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionEn && touched.descriptionEn && (
              <span className="error">{errors.descriptionEn}</span>
            )}
          </div>
          <input
            value={values.descriptionEn}
            onChange={handleChange}
            id="descriptionEn"
            type="descriptionEn"
            onBlur={handleBlur}
            className={
              errors.descriptionEn && touched.descriptionEn
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* descriptionAr */}
          <div className={styles.label}>
            <span>Arabic description</span>
            <span className={styles.error}> *</span>
            {errors.descriptionAr && touched.descriptionAr && (
              <span className="error">{errors.descriptionAr}</span>
            )}
          </div>
          <input
            value={values.descriptionAr}
            onChange={handleChange}
            id="descriptionAr"
            type="descriptionAr"
            onBlur={handleBlur}
            className={
              errors.descriptionAr && touched.descriptionAr
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* price */}
          <div className={styles.label}>
            <span>Price</span>
            <span className={styles.error}> *</span>
            {errors.price && touched.price && (
              <span className="error">{errors.stock}</span>
            )}
          </div>
          <input
            value={values.price}
            onChange={handleChange}
            id="price"
            type="number"
            onBlur={handleBlur}
            className={
              errors.price && touched.price
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Price number"
          ></input>
          {/* duration */}
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small"> */}
          <div className={styles.label}>
            <span>Duration</span>
            <span className={styles.error}> *</span>
            {errors.duration && touched.duration && (
              <span className="error">{errors.duration}</span>
            )}
          </div>
          <Select
            id="duration"
            value={values.duration}
            onChange={(e) => {
              setFieldValue("duration", e.target.value);
            }}
            size="small"
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="AllTime">AllTime</MenuItem>
          </Select>
          {/* </FormControl> */}
          <button className={styles.brown_button} type="submit">
            Create
          </button>
        </>
      )}
      <Loader open={isSubmitting} />
    </form>
  );
}
