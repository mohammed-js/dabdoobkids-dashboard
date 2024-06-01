import { useState, useEffect, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Products from "./pages/Products.jsx";
import ProductsVariants from "./pages/ProductsVariants.jsx";
import Categories from "./pages/Categories.jsx";
import SubCategories from "./pages/SubCategories.jsx";
import Brands from "./pages/Brands.jsx";
import Users from "./pages/Users.jsx";
import Orders from "./pages/Orders.jsx";
import Plans from "./pages/Plans.jsx";
import Collections from "./pages/Collections.jsx";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login.jsx";
import i18n from "./locals/i18n";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
function App() {
  const mode = useSelector((state) => state.mode);
  //* localization
  const { t } = useTranslation();
  let locale = i18n.language === "en" ? "en" : "ar";
  const direction = locale === "en" ? "ltr" : "rtl";
  useEffect(() => {
    document.body.style.backgroundColor =
      mode == "light" ? "#F2F1EB" : "rgb(37, 52, 107)";
    // #eefff5
  }, [mode]);
  const noAccessTokenPresent = !localStorage.getItem("access_token");
  const notInLoginPage = window.location.pathname !== "/login";
  const needToLogin = noAccessTokenPresent && notInLoginPage;
  useLayoutEffect(() => {
    if (needToLogin) {
      window.location.pathname = "/login";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }, []);
  if (needToLogin) {
    return null; // Return null to prevent rendering
  }
  return (
    <BrowserRouter>
      <div className="container">
        <div dir={direction}>
          {/* <Navbar /> */}
          <div className="body-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products-variants" element={<ProductsVariants />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/sub-categories" element={<SubCategories />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/users" element={<Users />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
