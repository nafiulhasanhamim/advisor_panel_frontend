import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Logout = () => {
  const navigate = useNavigate();
  const successMessage = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const errorMessage = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json", // Example header
    Authorization: `Token ${token}`, // Example header
  };
  useEffect(() => {
    try {
      axios
        .post("http://127.0.0.1:8000/logout", null, {
          headers,
        })
        .then((res) => {
          console.log(res?.data?.success);
          if (res.data.success) {
            localStorage.removeItem("userinfo");
            navigate("/");
            successMessage("Logged Out Successfully");
          } else {
            errorMessage("Failed to logout");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <></>;
};

export default Logout;
