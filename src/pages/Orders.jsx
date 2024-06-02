import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import MySwitch from "../components/MySwitch.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./orders.css";
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
import { format } from "date-fns";

import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import instance from "../utils/interceptor.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { notifySuccess, notifyError } from "../utils/general.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Orders() {
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
    if (data.length == 0) {
      instance
        .get("orders", {
          params: {
            items: 5,
            page: page,
            all: true,
          },
        })
        .then((response) => {
          console.log(response.data.data);

          setData(response.data.data.data);
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
                <th>Order Id</th>
                <th>Order Reference</th>
                <th>User Id</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Purchase Date</th>
                <th>Items Count</th>
                <th>Total Price</th>
                <th>Discount</th>
                <th>Order Status</th>
                <th>Deliver Status</th>
                <th>Payment Method</th>
                <th>Promo Code</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data?.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.orderReference}</td>
                    <td>{item.user}</td>
                    <td>
                      {format(
                        new Date(item.createdAt),
                        "MMMM d, yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(item.updatedAt),
                        "MMMM d, yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(item.purchaseDate),
                        "MMMM d, yyyy HH:mm:ss"
                      )}
                    </td>
                    <td>{item.itemsCount}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.discount}</td>
                    <td>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Order Status
                        </InputLabel>
                        <Select
                          size="small"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={item.orderStatus}
                          label="Order Status"
                          onChange={(e) => {
                            instance
                              .put(`orders/${item.id}`, {
                                status: e.target.value,
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
                        >
                          <MenuItem value="Pending" disabled>
                            Pending
                          </MenuItem>
                          <MenuItem value="Paid">Paid</MenuItem>
                          <MenuItem value="Failed">Failed</MenuItem>
                          <MenuItem value="Refunded">Refunded</MenuItem>
                          <MenuItem value="Partial Refunded">
                            Partial Refunded
                          </MenuItem>
                          <MenuItem value="Returned">Returned</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Delivery Status
                        </InputLabel>
                        <Select
                          size="small"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={item.delivertStatus}
                          label="Delivery Status"
                          onChange={(e) => {
                            instance
                              .put(`orders/${item.id}`, {
                                deliveryStatus: e.target.value,
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
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                          <MenuItem value="Returned">Returned</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.promocode ? item.promocode : "-"}</td>
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
