import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./Popup.module.css";
import "react-phone-number-input/style.css";
import Form from "./Form";

export default function Popup({
  open,
  setOpen,
  type,
  setForceUpdate,
  setData,
  setIsLoading,
  currentId,
}) {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <>
        {type === "product_create" && (
          <Form
            type="product_create"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
          />
        )}
        {type === "product_update" && (
          <Form
            type="product_update"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
            currentId={currentId}
          />
        )}
        {type === "collection_create" && (
          <Form
            type="collection_create"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
          />
        )}
        {type === "collection_update" && (
          <Form
            type="collection_update"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
            currentId={currentId}
          />
        )}
        {type === "category_create" && (
          <Form
            type="category_create"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
          />
        )}
        {type === "category_update" && (
          <Form
            type="category_update"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
            currentId={currentId}
          />
        )}
        {type === "subcategory_create" && (
          <Form
            type="subcategory_create"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
          />
        )}
        {type === "subcategory_update" && (
          <Form
            type="subcategory_update"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
            currentId={currentId}
          />
        )}
        {type === "brand_create" && (
          <Form
            type="brand_create"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
          />
        )}
        {type === "brand_update" && (
          <Form
            type="brand_update"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
            currentId={currentId}
          />
        )}
        {type === "user_create" && (
          <Form
            type="user_create"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
          />
        )}
        {type === "user_update" && (
          <Form
            type="user_update"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
            currentId={currentId}
          />
        )}
        {type === "plan_create" && (
          <Form
            type="plan_create"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
          />
        )}
        {type === "plan_update" && (
          <Form
            type="plan_update"
            setOpen={setOpen}
            setForceUpdate={setForceUpdate}
            setData={setData}
            setIsLoading={setIsLoading}
            currentId={currentId}
          />
        )}
      </>
    </Modal>
  );
}
