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
import "./services.css";
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

  // return (
  //   <div dir={direction}>
  //     <div className="navbar-container">
  //       <img src={logo} width="100px" />
  //       <div className="navbar-sub-container">
  //         <Switch />
  //         <Popover />
  //       </div>
  //     </div>
  //     <div className="body-container">
  //       <div className="body-sidebar">
  //         <Sidebar />
  //       </div>
  //       <div className="body-content-services">
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //             gap: "5px",
  //             marginBottom: "30px",
  //           }}
  //         >
  //           <div
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               gap: "5px",
  //             }}
  //           >
  //             <FontAwesomeIcon
  //               icon={faFileLines}
  //               style={{ color: "#0f2941" }}
  //             />
  //             <div>مكتبة الملفات</div>
  //           </div>
  //           <div className="search-field-container">
  //             <TextField
  //               size="small"
  //               variant="outlined"
  //               placeholder={locale == "en" ? "search" : "بحث"}
  //               InputProps={{
  //                 endAdornment: (
  //                   <IconButton onClick={handleSearch} edge="end">
  //                     <SearchIcon />
  //                   </IconButton>
  //                 ),
  //               }}
  //             />
  //           </div>
  //         </div>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //             marginBottom: "30px",
  //           }}
  //         >
  //           <div
  //             style={{
  //               display: "flex",
  //               flexWrap: "wrap",
  //               alignItems: "center",
  //               gap: "10px",
  //             }}
  //           >
  //             {[
  //               { title: { en: "All", ar: "الكل" }, action: "#" },
  //               {
  //                 title: { en: "User Guide Files", ar: "ملفات دليل المستخدم" },
  //                 action: "#",
  //               },
  //               {
  //                 title: { en: "Services and Rules", ar: "الأنظمة واللوائح" },
  //                 action: "#",
  //               },
  //               {
  //                 title: {
  //                   en: "Cyber Security Policies",
  //                   ar: "سياسات الأمن السيبراني",
  //                 },
  //                 action: "#",
  //               },
  //               {
  //                 title: { en: "Offers and Discounts", ar: "العروض والخصومات" },
  //                 action: "#",
  //               },
  //               {
  //                 title: { en: "Generalizations", ar: "التعاميم" },
  //                 action: "#",
  //               },
  //             ].map((item) => {
  //               const color = checked === item.title.en ? "#fff" : "#0f2941";
  //               const bgColor = checked === item.title.en ? "#0f2941" : "#fff";
  //               return (
  //                 <Button
  //                   variant="contained"
  //                   onClick={() => {
  //                     setChecked(item.title.en);
  //                   }}
  //                   sx={{
  //                     display: "flex",
  //                     gap: "10px",
  //                     color,
  //                     bgcolor: bgColor,
  //                     "&:hover": {
  //                       color,
  //                       bgcolor: bgColor,
  //                     },
  //                   }}
  //                 >
  //                   {locale === "en" ? item.title.en : item.title.ar}
  //                 </Button>
  //               );
  //             })}
  //           </div>

  //           {/* <div>filter</div> */}
  //         </div>

  //         <div className="body-section-title">الخدمات والأنظمة العالمة</div>
  //         <div className="body-section">
  //           {[
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //           ].map((item) => (
  //             <ServiceCard item={item} />
  //           ))}
  //         </div>
  //         <div className="body-section-title">منصة الأنظمة الداخلية</div>
  //         <div className="body-section">
  //           {[
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //             {
  //               title: {
  //                 en: "user guide for how to use the files",
  //                 ar: "دليل المستخدم لنظام مشاركة الملفات",
  //               },
  //               date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
  //             },
  //           ].map((item) => (
  //             <ServiceCard item={item} />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="body-content-services">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: mode === "light" ? "#25346B" : "#fff",
          }}
        >
          <FontAwesomeIcon icon={faFileLines} />
          <div>مكتبة الملفات</div>
        </div>
        <div className="search-field-container">
          <TextField
            size="small"
            variant="outlined"
            placeholder={locale == "en" ? "search" : "بحث"}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch} edge="end">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {[
            { title: { en: "All", ar: "الكل" }, action: "#" },
            {
              title: { en: "User Guide Files", ar: "ملفات دليل المستخدم" },
              action: "",
            },
            {
              title: { en: "Services and Rules", ar: "الأنظمة واللوائح" },
              action: "",
            },
            {
              title: {
                en: "Cyber Security Policies",
                ar: "سياسات الأمن السيبراني",
              },
              action: "",
            },
            {
              title: { en: "Offers and Discounts", ar: "العروض والخصومات" },
              action: "https://portal.walaplus.com/login",
            },
            {
              title: { en: "Generalizations", ar: "التعاميم" },
              action: "",
            },
          ].map((item) => {
            const color = checked === item.title.en ? "#fff" : "#0f2941";
            const bgColor = checked === item.title.en ? "#0f2941" : "#fff";
            return (
              <Button
                variant="contained"
                onClick={() => {
                  setChecked(item.title.en);
                  if (item.action) {
                    // window.location.href = item.action;
                    window.open(item.action);
                  }
                }}
                sx={{
                  display: "flex",
                  gap: "10px",
                  color,
                  bgcolor: bgColor,
                  "&:hover": {
                    color,
                    bgcolor: bgColor,
                  },
                }}
              >
                {locale === "en" ? item.title.en : item.title.ar}
              </Button>
            );
          })}
        </div>

        {/* <div>filter</div> */}
      </div>

      <div
        className="body-section-title"
        style={{
          color: mode === "light" ? "#25346B" : "#fff",
        }}
      >
        الخدمات والأنظمة العالمة
      </div>
      <div className="body-section">
        {[
          {
            title: {
              en: "user guide for how to use the files",
              ar: "دليل المستخدم لنظام مشاركة الملفات",
            },
            date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
          },
          {
            title: {
              en: "user guide for how to use the files",
              ar: "دليل المستخدم للبريد",
            },
            date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
          },
          {
            title: {
              en: "user guide for how to use the files",
              ar: "دليل المستخدم لنظام مشاركة الملفات",
            },
            date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
          },
          {
            title: {
              en: "user guide for how to use the files",
              ar: "دليل المستخدم للبريد",
            },
            date: { en: "November 23, 2023", ar: "٢٣ نوفمبر ٢٠٢٣" },
          },
        ].map((item) => (
          <ServiceCard item={item} />
        ))}
      </div>
    </div>
  );
}
