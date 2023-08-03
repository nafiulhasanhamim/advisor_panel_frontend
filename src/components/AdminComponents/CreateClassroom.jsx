import React, { useState } from "react";
import "../../App.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
const CreateClassroom = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const [createClassroom, setCreateClassroom] = useState({
    building_name: "NAC",
    roomNo: 0,
    total_seat: 0,
    detail: "",
  });
  const { building_name, roomNo, total_seat, detail } = createClassroom;
  const handleChange = (e) => {
    setCreateClassroom((prev) => ({
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

  const headers = {
    "Content-Type": "application/json", // Example header
    Authorization: `Token ${token}`, // Example header
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://127.0.0.1:8000/create_classroom ", createClassroom, {
          headers,
        })
        .then((res) => {
          console.log(res.data.message);
          if (
            res.data.message === `${roomNo} has been created with all the slots`
          ) {
            successMessage(`${building_name} - ${res.data.message}`);
          } else {
            errorMessage(res.data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header>
        <div className="logosec">
          <div className="logo">Admin Panel</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            onClick={handleToggle}
            id="menuicn"
            alt="menu-icon"
          />
        </div>

        <div className="message">
          <div className="circle"></div>
          <div className="dp">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt="dp"
            />
          </div>
        </div>
      </header>
      <div className="main-container">
        <div className={`navcontainer ${isNavOpen ? "navclose" : ""}`}>
          <nav className="nav">
            <div className="nav-upper-options">
              <div className="nav-option option1">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-img"
                  alt="dashboard"
                />
                <h3>
                  {" "}
                  <Link to="/admin/home">Dashboard </Link>
                </h3>
              </div>
              <div className="option2 nav-option">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/all-courses"
                    style={{ textDecoration: "none" }}
                  >
                    All Courses
                  </Link>{" "}
                </h5>
              </div>
              <div className="option2 nav-option">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/all-faculties"
                    style={{ textDecoration: "none" }}
                  >
                    All Faculties
                  </Link>{" "}
                </h5>
              </div>
              <div className="option2 nav-option">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="articles"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/add-course"
                    style={{ textDecoration: "none" }}
                  >
                    Add Course
                  </Link>{" "}
                </h5>
              </div>

              <div className="nav-option option3">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                  className="nav-img"
                  alt="report"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/add-faculty"
                    style={{ textDecoration: "none" }}
                  >
                    Add Faculty
                  </Link>{" "}
                </h5>
              </div>

              <div className="nav-option option4">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                  className="nav-img"
                  alt="institution"
                />
                <h5>
                  {" "}
                  <Link
                    to="/admin/create-classroom"
                    style={{ textDecoration: "none" }}
                  >
                    Create Classroom
                  </Link>{" "}
                </h5>
              </div>

              <div className="nav-option logout">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className="nav-img"
                  alt="logout"
                />
                <h5>
                  {" "}
                  <Link to="/logout" style={{ textDecoration: "none" }}>
                    Logout
                  </Link>{" "}
                </h5>
              </div>
            </div>
          </nav>
        </div>
        <div className="main">
          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Create Classroom</h1>
            </div>
            <form className="form-horizontal m-5" onSubmit={handleSubmit}>
              <fieldset>
                <div className="form-group">
                  <label className="col-md-4 control-label">
                    Building Name
                  </label>
                  <div className="col-md-4">
                    <select
                      id="coursetype"
                      name="building_name"
                      value={building_name}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="NAC">NAC</option>
                      <option value="SAC">SAC</option>
                      <option value="Library">Library</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label">Room No</label>
                  <div className="col-md-4">
                    <input
                      id="textinput4"
                      name="roomNo"
                      value={roomNo}
                      onChange={handleChange}
                      type="number"
                      placeholder=""
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label">
                    Total seat (Maximum 40)
                  </label>
                  <div className="col-md-4">
                    <input
                      id="textinput4"
                      name="total_seat"
                      value={total_seat}
                      onChange={handleChange}
                      type="text"
                      placeholder=""
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label">
                    Classroom Details
                  </label>
                  <div className="col-md-4">
                    <input
                      id="textinput4"
                      name="detail"
                      value={detail}
                      onChange={handleChange}
                      type="text"
                      placeholder=""
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-md-4 mt-4">
                    <button
                      id="button"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Add Classroom
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateClassroom;
