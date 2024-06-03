import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import MySwitch from "../components/MySwitch.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./analytics.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import i18n from "../locals/i18n.js";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Popup from "../components/Popup.jsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { truncateText } from "../utils/general.js";
import Sidebar from "../components/Sidebar.jsx";

import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import instance from "../utils/interceptor.js";
import Switch from "@mui/material/Switch";
import { notifySuccess, notifyError } from "../utils/general.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Analytics() {
  const [categories, setCategories] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  const [open, setOpen] = useState(false);
  const [popupType, setPopupType] = useState("product_create");
  // ***
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleAgree = () => {
    setIsLoading(true);
    setDialogOpen(false);
    instance
      .delete(`users/${currentId}`)
      .then((response) => {
        console.log(response);
        setData([]);
        setForceUpdate((prev) => !prev);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setIsLoading(false);
      });
  };
  //* localization
  const { t } = useTranslation();
  let locale = i18n.language === "en" ? "en" : "ar";
  const direction = locale === "en" ? "ltr" : "rtl";

  //* routing
  useEffect(() => {
    instance
      .get("analytics", {
        params: {
          items: 5,
          page: page,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return (
    <>
      <div className="body-sidebar">
        <Sidebar />
      </div>
      <div class="content-container">
        <div class="table-container">
          <table class="stunning-table">
            <thead>
              <tr>
                <th>Completed Orders</th>
                <th>Refunded Orders</th>
                <th>Earnings Orders</th>
                <th>Active Products</th>
                <th>Inactive Products</th>
                <th>Admins Number</th>
                <th>Total Users Number</th>
                <th>Active Number</th>
                <th>Inactive Number</th>
                <th>Verified Number</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && data && (
                <tr>
                  <td>{data.orders.completed}</td>
                  <td>{data.orders.refunded}</td>
                  <td>{data.orders.earnings}</td>
                  <td>{data.products.active}</td>
                  <td>{data.products.inactive}</td>
                  <td>{data.users.admins}</td>
                  <td>{data.users.users.total}</td>
                  <td>{data.users.users.active}</td>
                  <td>{data.users.users.inactive}</td>
                  <td>{data.users.users.verified}</td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan="15">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ** */}

          <Dialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to delete it?"}
            </DialogTitle>

            <DialogActions>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Disagree
              </Button>
              <Button onClick={handleAgree} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
