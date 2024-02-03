import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import i18n from "../locals/i18n";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./my-swiper.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const news = [
  {
    title: { en: "", ar: "الرياض في قلب العالم" },
    description: { en: "", ar: "الرياض اكسبو 2023، ملتقى لكل شعوب العالم" },
    url: "https://i.postimg.cc/85hwCsjH/0852383d-9c67-4773-aeeb-b0e70cbb531f.jpg",
    img: "/01.jpg",
  },
  {
    title: { en: "", ar: "خدمة السحابة الحكومية (ديم)" },
    description: {
      en: "",
      ar: "سحابة حكومية تتيح للمستخدمين رفع الملفات ومزامنتها في سحابة التخزين ومن ثم الوصول اليها من خلال الكمبيوتر او المتصفح او الهواتف المتنقلة من أي مكان وفي أي وقت.",
    },
    url: "https://i.postimg.cc/hjLj3R5v/0852383d-9c67-4773-aeeb-b0e70cbb531f.jpg",
    img: "/02.jpg",
  },
  {
    title: { en: "", ar: "سحابة ديم في ليب" },
    description: {
      en: "",
      ar: "تعني السحابة الحكومية ديم بتوقير خدمات الأصول التقنية لجميع الجهات الحكومية بكل أمان واعتمادية ومرونة، وتتيح الاستفادة منها بشكل لحظي ومباشر.",
    },
    url: "https://i.postimg.cc/SKT6g8Hj/0852383d-9c67-4773-aeeb-b0e70cbb531f.jpg",
    img: "/03.jpg",
  },
];
export default function MySwiper() {
  const mode = useSelector((state) => state.mode);
  let locale = i18n.language === "en" ? "en" : "ar";

  return (
    <>
      <Swiper
        dir="rtl"
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {news.map((item) => (
          <SwiperSlide>
            <div
              style={{
                cursor: "pointer",
                width: "100%",
                height: "100%",
                color: mode === "light" ? "#0f3a62" : "#fff",
                backgroundColor: mode === "light" ? "#fff" : "#0f3a62",
                // padding: "10px",
                // paddingTop: "30px",
              }}
              onClick={() => {
                window.open(item.url, "_blank").focus();
              }}
            >
              {/* <div
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  paddingBottom: "10px",
                }}
              >
                {locale === "en" ? item.title.en : item.title.ar}
              </div>
              <div>
                {locale === "en" ? item.description.en : item.description.ar}
              </div> */}
              <img src={item.img} style={{ width: "100%", height: "100%" }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
