// PopoverMenu.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons"; // Use faGlobe instead of fa-solid fa-globe
import i18n from "../locals/i18n";

const PopoverMenu = () => {
  let locale = i18n.language === "en" ? "en" : "ar";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          width: "110px",
          display: "flex",
          gap: "10px",
          color: "#ad6b46",
          bgcolor: "#fff",
          "&:hover": {
            color: "#ad6b46",
            bgcolor: "#fff",
          },
        }}
      >
        {locale === "en" ? "English" : "عربي"}
        <FontAwesomeIcon icon={faGlobe} />
      </Button>
      <Popover
        sx={{
          mt: "5px",
          "& .MuiList-root": {
            padding: 0,
          },
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: locale === "en" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: locale === "en" ? "right" : "left",
        }}
      >
        <MenuList>
          {locale === "ar" && (
            <MenuItem
              sx={{ width: "110px", display: "flex", justifyContent: "center" }}
              onClick={() => {
                handleClose();
                i18n.changeLanguage("en");
              }}
            >
              {locale === "en" ? "English" : "انجليزي"}
            </MenuItem>
          )}

          {locale === "en" && (
            <MenuItem
              sx={{ width: "110px", display: "flex", justifyContent: "center" }}
              onClick={() => {
                handleClose();
                i18n.changeLanguage("ar");
              }}
            >
              {locale === "en" ? "Arabic" : "عربي"}
            </MenuItem>
          )}
        </MenuList>
      </Popover>
    </div>
  );
};

export default PopoverMenu;
