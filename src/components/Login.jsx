import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import img_01 from "../images/NSU_logo.png";
import { useDispatch } from "react-redux";
import { getRoleInfo } from "../features/roleSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });
  const { username, password } = user;
  const handleChange = (e) => {
    setuser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post("http://127.0.0.1:8000/login", user)
        .then((res) => {
          console.log(res.data.role);
          if (res.data.role) {
            const userinfo = {
              token: res?.data?.token,
              role: res?.data?.role,
            };
            const stringify = JSON.stringify(userinfo);
            localStorage.setItem("userinfo", stringify);
            dispatch(getRoleInfo());

            if (res?.data?.role === "Faculty") {
              successMessage("Successfully Logged In");
              navigate("/faculty/home");
            }
            if (res?.data?.role === "Admin") {
              successMessage("Successfully Logged In");
              navigate("/admin/home");
            }
          } else {
            toast.error("UserName OR Password Mismatched", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={img_01} alt="IMG" />
            </div>

            <form
              className="login100-form validate-form"
              onSubmit={handleSubmit}
            >
              <span className="login100-form-title">Sign in</span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  value={username}
                  placeholder="UserName"
                  onChange={handleChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
