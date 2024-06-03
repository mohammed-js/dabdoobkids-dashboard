// Sidebar.js
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons"; // Use faGlobe instead of fa-solid fa-globe
import i18n from "../locals/i18n";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const Sidebar = () => {
  //*

  let locale = i18n.language === "en" ? "en" : "ar";
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (["", ""].includes(item.path)) {
      window.location.href = item.path;
    } else {
      navigate(item.path);
    }
  };

  const sidebarItems = [
    {
      icon: faHouse,
      text: { en: "Products", ar: "المنتجات" },
      path: "/products",
    },
    {
      icon: faHouse,
      text: { en: "Product Variants", ar: "متغيرات المنتج" },
      path: "/products-variants",
    },
    {
      icon: faHouse,
      text: { en: "Categories", ar: "التصنيفات" },
      path: "/categories",
    },
    {
      icon: faHouse,
      text: { en: "Sub-Categories", ar: "التصنيفات الفرعية" },
      path: "/sub-categories",
    },
    {
      icon: faHouse,
      text: { en: "Brands", ar: "البراندات" },
      path: "/brands",
    },
    {
      icon: faHouse,
      text: { en: "Users", ar: "المستخدمون" },
      path: "/users",
    },
    {
      icon: faHouse,
      text: { en: "Orders", ar: "الطلبات" },
      path: "/orders",
    },
    {
      icon: faHouse,
      text: { en: "Plans", ar: "الخطط" },
      path: "/plans",
    },
    {
      icon: faHouse,
      text: { en: "Collections", ar: "الخطط" },
      path: "/collections",
    },
    {
      icon: faHouse,
      text: { en: "Contents", ar: "المحتوى" },
      path: "/contents",
    },
    {
      icon: faHouse,
      text: { en: "Analytics", ar: "التحليلات" },
      path: "/analytics",
    },
  ];
  const active = locale === "en" ? "active-en" : "active-ar";
  return (
    <div className="sidebar">
      <List>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.id}
            button
            className={`sidebar-item ${
              location.pathname === item.path ? active : ""
            }`}
            onClick={() => {
              handleItemClick(item);
            }}
          >
            <FontAwesomeIcon icon={item.icon} />
            <div dir="auto">
              {locale === "en" ? item.text.en : item.text.ar}
            </div>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            mb: "10px",
            backgroundColor: "#ad6b46",
            "&:hover": {
              backgroundColor: "#ad6b46",
            },
          }}
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.replace("/login");
            // http://localhost:3005
          }}
        >
          Log Out
        </Button>
      </Box>
    </div>
  );
};

export default Sidebar;
