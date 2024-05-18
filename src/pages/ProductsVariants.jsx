import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import MySwitch from "../components/MySwitch.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./products-variants.css";
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
  const [popupType, setPopupType] = useState("product_variant_create");
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
    // if (data.length == 0) {
    setIsLoading(true);
    if (true) {
      console.log("bbbbbbbbbbbbbbbbbbb");
      instance
        .get("products", {
          params: {
            items: 5,
            page: page,
          },
        })
        .then((response) => {
          console.log("ssssssssssss", response.data.data.products);
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
                      setPopupType("product_variant_create");
                      setOpen(true);
                    }}
                  />
                </th>
                <th>Product Name</th>
                <th>Variants</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.map((item) => (
                  <tr>
                    <td></td>
                    <td>{item.name}</td>
                    <td>
                      {item.variants == 0
                        ? "No variants"
                        : item.variants.map((variant) => (
                            <Box
                              sx={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                mb: "5px",
                              }}
                            >
                              <Box>
                                <strong>ID: </strong>
                                <span contentEditable>{variant.id}</span>
                              </Box>
                              <Box>
                                <strong>Color: </strong>
                                <span contentEditable>{variant.color}</span>
                              </Box>
                              <Box>
                                <strong>Size: </strong>
                                <span contentEditable>{variant.size}</span>
                              </Box>
                              <Box>
                                <strong>Stock: </strong>
                                <span contentEditable>{variant.stock}</span>
                              </Box>
                              <Box>
                                <strong>Price: </strong>
                                <span contentEditable>{variant.price}</span>
                              </Box>
                              <Box>
                                <strong>Old Price: </strong>
                                <span contentEditable>{variant.oldPrice}</span>
                              </Box>
                              <Box>
                                <strong>Barcode: </strong>
                                <span contentEditable>{variant.barcode}</span>
                              </Box>
                              <Box>
                                <strong>Reference: </strong>
                                <span contentEditable>
                                  {variant.variantReference}
                                </span>
                              </Box>
                              <Button
                                variant="contained"
                                onClick={(event) => {
                                  const container =
                                    event.currentTarget.closest("div");
                                  const editableSpans =
                                    container.querySelectorAll(
                                      "[contentEditable]"
                                    );
                                  instance
                                    .put(
                                      `/products/${item.id}/variants/${editableSpans[0].textContent}`,
                                      {
                                        color: editableSpans[1].textContent,
                                        size: editableSpans[2].textContent,
                                        stock: +editableSpans[3].textContent,
                                        price: +editableSpans[4].textContent,
                                        oldPrice: +editableSpans[5].textContent,
                                        barcode: editableSpans[6].textContent,
                                        variantReference:
                                          editableSpans[7].textContent,
                                        // isActive: true,
                                      }
                                    )
                                    .then((response) => {
                                      setForceUpdate((prev) => !prev);
                                    })
                                    .catch((error) => {
                                      console.error("API Error:", error);
                                    });
                                }}
                              >
                                Update
                              </Button>
                              <Button
                                variant="contained"
                                onClick={(event) => {
                                  const container =
                                    event.currentTarget.closest("div");
                                  const editableSpans =
                                    container.querySelectorAll(
                                      "[contentEditable]"
                                    );
                                  instance
                                    .delete(
                                      `/products/${item.id}/variants/${editableSpans[0].textContent}`
                                    )
                                    .then((response) => {
                                      setForceUpdate((prev) => !prev);
                                    })
                                    .catch((error) => {
                                      console.error("API Error:", error);
                                    });
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          ))}
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
