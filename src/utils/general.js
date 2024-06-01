import { toast } from "react-toastify";

export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};
export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 1000, // Auto close the notification after 3000 milliseconds (3 seconds)
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
