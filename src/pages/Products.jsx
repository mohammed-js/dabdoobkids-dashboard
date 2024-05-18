import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import MySwitch from "../components/MySwitch.jsx";
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
import { truncateText } from "../utils/general.js";
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
      .delete(`products/${currentId}`)
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
        .get("products", {
          params: {
            items: 5,
            page: page,
          },
        })
        .then((response) => {
          setData(response.data.data.products);
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
        <div class="table-container">
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
                      setPopupType("product_create");
                      setOpen(true);
                    }}
                  />
                </th>
                <th>Name</th>
                <th style={{ maxWidth: "200px" }}>Description</th>
                <th>Brand</th>
                <th>Category</th>
                {/* <th>Sizes</th>
                <th>Colors</th> */}
                <th>Active Status</th>
                {/* <th>Stock</th>
                <th>Price</th>
                <th>Old price</th> */}
                <th>Is new</th>
                <th>Is sold</th>
                <th>In sale</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.map((item) => (
                  <tr>
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
                            setPopupType("product_update");
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
                    <td>{item.name}</td>
                    <td>{truncateText(item.description, 10)}</td>
                    <td>{item.brand.name}</td>
                    <td>{item.category.name}</td>
                    {/* <td>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {item.sizes.map((size) => (
                          <div>{size}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {item.colors.map((color) => (
                          <div
                            style={{
                              backgroundColor: color,
                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",
                            }}
                          ></div>
                        ))}
                      </div>
                    </td> */}
                    <td>
                      {true ? (
                        <div style={{ color: "green", fontWeight: "bold" }}>
                          active
                        </div>
                      ) : (
                        <div style={{ color: "red", fontWeight: "bold" }}>
                          inactive
                        </div>
                      )}
                    </td>
                    {/* <td>{item.stock}</td>
                    <td>{item.price}</td>
                    <td>{item.oldPrice}</td> */}
                    <td>{`${
                      item.extraInfo?.new ? item.extraInfo?.new : false
                    }`}</td>
                    <td>{`${
                      item.extraInfo?.sold ? item.extraInfo?.sold : false
                    }`}</td>
                    <td>{`${
                      item.extraInfo?.sale ? item.extraInfo?.sale : false
                    }`}</td>

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
