import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import MySwitch from "../components/MySwitch.jsx";
import Switch from "@mui/material/Switch";
import { notifySuccess, notifyError } from "../utils/general.js";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./products.css";
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

import Sidebar from "../components/Sidebar.jsx";

import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import instance from "../utils/interceptor.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Products() {
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
      .delete(`categories/${currentId}`)
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
    if (data.length == 0) {
      instance
        .get("categories", {
          params: {
            items: 5,
            page: page,
            all: true,
          },
        })
        .then((response) => {
          console.log(response.data.data.categories);
          setData(response.data.data.categories);
          setTotalPages(response.data.data.metadata.totalPages);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  }, [forceUpdate]);

  return (
    <>
      <div className="body-sidebar">
        <Sidebar />
      </div>
      <div class="content-container">
        <Popup
          type={popupType}
          open={open}
          setOpen={setOpen}
          setForceUpdate={setForceUpdate}
          setData={setData}
          setIsLoading={setIsLoading}
          currentId={currentId}
        />
        <div class="table-container">
          <Pagination
            color="primary"
            variant="outlined"
            count={totalPages}
            page={page}
            onChange={(e, v) => {
              setPage(v);
              setIsLoading(true);
              setData([]);
              setForceUpdate((prev) => !prev);
            }}
            sx={{ mt: "10px", mb: "10px", width: "100%" }}
          />
          <table class="stunning-table">
            <thead>
              <tr>
                <th
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span>Control</span>

                  <AddCircleIcon
                    sx={{ color: "#b5e550", cursor: "pointer", fontSize: 30 }}
                    onClick={() => {
                      setPopupType("category_create");
                      setOpen(true);
                    }}
                  />
                </th>
                <th>Name</th>
                <th>Active Status</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <EditIcon
                          sx={{
                            color: "orange",
                            cursor: "pointer",
                            fontSize: 30,
                          }}
                          onClick={() => {
                            setCurrentId(item.id);
                            setPopupType("category_update");
                            setOpen(true);
                          }}
                        />
                        <DeleteIcon
                          sx={{ color: "red", cursor: "pointer", fontSize: 30 }}
                          onClick={() => {
                            setDialogOpen(true);
                            setCurrentId(item.id);
                          }}
                        />
                      </div>
                    </td>
                    <td>{item.name.en}</td>
                    <Switch
                      defaultChecked={item.isActive ? true : false}
                      onClick={(e) => {
                        console.log(e);
                        instance
                          .put(`categories/${item.id}`, {
                            isActive: e.target.checked,
                          })
                          .then((response) => {
                            console.log(response);
                            // setForceUpdate((prev) => !prev);
                            notifySuccess("Successfully updated!");
                          })
                          .catch((error) => {
                            notifyError("Error encountered!");
                          });
                      }}
                    />
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {item.images.map((item, index) => (
                          <a
                            href={item}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                          >
                            image {index + 1}
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              {isLoading && (
                <tr>
                  <td colSpan="9">
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
