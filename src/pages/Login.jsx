import { useState, useEffect } from "react";
import "./login.css";

import i18n from "../locals/i18n";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import Form from "../components/Form";
export default function Services() {
  const mode = useSelector((state) => state.mode);

  const [checked, setChecked] = useState("All");
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching...");
  };
  //* localization
  const { t } = useTranslation();
  let locale = i18n.language === "en" ? "en" : "ar";
  const direction = locale === "en" ? "ltr" : "rtl";
  console.log(locale);

  //* routing

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form type="login" />
    </div>
  );
}
