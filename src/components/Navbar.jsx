import { useState } from "react";
import logo from "../assets/logo.png";
import Switch from "./MySwitch";
import Popover from "../components/Popover";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons"; // Use faGlobe instead of fa-solid fa-globe
import i18n from "../locals/i18n";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [choosen, setChoosen] = useState(false);
  let locale = i18n.language === "en" ? "en" : "ar";
  const location = useLocation();
  const navigate = useNavigate();
  const active = locale === "en" ? "active-en" : "active-ar";

  const handleItemClick = (item) => {
    navigate(item.path);
  };

  const sidebarItems = [
    {
      icon: faHouse,
      text: { en: "Home", ar: "الرئيسية" },
      path: "/",
    },
    {
      icon: faHouse,
      text: { en: "About", ar: "عن ديم" },
      path: "/about",
    },
    {
      icon: faHouse,
      text: { en: "Organizational Chart", ar: "الهيكل التنظيمي" },
    },
    {
      icon: faHouse,
      text: { en: "Services and Systems", ar: "الخدمات والأنظمة" },
      path: "/services",
    },
    {
      icon: faHouse,
      text: { en: "Files Library", ar: "مكتبة الملفات" },
      path: "/files",
    },
    { icon: faHouse, text: { en: "Deem Attribution", ar: "منسوب ديم" } },
    { icon: faHouse, text: { en: "Calender", ar: "التقويم" } },
  ];

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };
  const mode = useSelector((state) => state.mode);

  return (
    <>
      <div className="navbar-container">
        <IconButton
          className="burger-menu"
          onClick={toggleDrawer(true)}
          sx={{
            borderRadius: "3px",
            p: "5px",
            bgcolor: "#fff",
            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          <MenuIcon
            sx={{
              fontSize: "30px",
            }}
          />
        </IconButton>
        <div className="navbar-sub-container">
          <Switch />
          <Popover />
        </div>
        {/* drawer */}
      </div>
      <div>
        {/* <Button >Open Drawer</Button> */}
        <Drawer
          anchor={locale === "en" ? "left" : "right"}
          open={open}
          onClose={toggleDrawer(false)}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            ></div>
            <Divider />
            <List>
              {sidebarItems.map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  className={`sidebar-item ${
                    location.pathname === item.path ? active : ""
                  }`}
                >
                  <ListItemButton
                    dir={locale === "en" ? "ltr" : "rtl"}
                    sx={{
                      display: "flex",
                      gap: "10px",
                      textAlign: locale === "en" ? "left" : "right",
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <ListItemText
                      primary={locale === "en" ? item.text.en : item.text.ar}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
}
