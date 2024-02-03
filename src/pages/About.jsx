import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Switch from "../components/MySwitch";
import Popover from "../components/Popover";
import Sidebar from "../components/Sidebar";
import FileCard from "../components/FileCard";
import ServiceCard from "../components/ServiceCard";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./about.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import i18n from "../locals/i18n";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFontAwesome,
  faUser,
  faAward,
  faLightbulb,
  faFingerprint,
  faPersonWalkingLuggage,
  faChartSimple,
  faFile,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons"; // Use faGlobe instead of fa-solid fa-globe
import { useSelector, useDispatch } from "react-redux";

export default function Files() {
  const mode = useSelector((state) => state.mode);
  console.log(mode);

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
  const data = {
    title: { en: "About Deem", ar: "عن ديم" },
    body: {
      en: "“Deem” is one of the technical and innovative solutions to support digital transformation, in accordance with Saudi Vision 2030. It provides an integrated infrastructure built on the latest technologies that ensure high security of government data, and contributes to reducing government spending on managing, protecting, operating and maintaining infrastructure. It also aims to unify centers Data in government sectors to support their efforts to increase the operating efficiency of these centers.",
      ar: "تُعد «ديم» أحد الحلول التقنية والابتكارية لدعم التحوّل الرقمي، وفق رؤية السعودية 2030. وتوفر بنية تحتية متكاملة مبنية على أحدث التقنيات التي تضمن الأمان العالي للبيانات الحكومية، وتُسهم في خفض الإنفاق الحكومي على إدارة وحماية وتشغيل وصيانة البُنى التحتية، كما تهدف إلى توحيد مراكز البيانات في القطاعات الحكومية لدعم جهودها في زيادة كفاءة التشغيل لهذه المراكز.",
    },
  };

  return (
    <div
      className="about-container"
      style={{
        color: mode === "dark" ? "#fff" : "#0f3a62",
      }}
    >
      <div className="about-title">
        {locale === "en" ? data.title.en : data.title.ar}
      </div>
      <div className="about-body">
        {locale === "en" ? data.body.en : data.body.ar}
      </div>
    </div>
  );
}
