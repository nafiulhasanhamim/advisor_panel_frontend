import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../App.css";
const AddCourse = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const [createCourse, setCreateCourse] = useState({
    name: "",
    code: "",
    credit: 0,
    type: "Lab",
    no_of_sections: 0,
  });

  const { name, code, credit, type, no_of_sections } = createCourse;
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
  const handleChange = (e) => {
    setCreateCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://127.0.0.1:8000/course_create ", createCourse, {
          headers,
        })
        .then((res) => {
          console.log(res?.data?.message);
          if (
            res?.data?.message ===
            `${name} (${type}) created successfully with total ${no_of_sections} sections`
          ) {
            successMessage(res.data.message);
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
              <h1 className="recent-Articles">Create Course</h1>
            </div>

            <form className="form-horizontal m-5" onSubmit={handleSubmit}>
              <fieldset>
                <div className="form-group">
                  <label className="col-md-4 control-label">Course Name</label>
                  <div className="col-md-4">
                    <input
                      name="name"
                      value={name}
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
                    Course Credit
                  </label>
                  <div className="col-md-4">
                    <input
                      id="textinput3"
                      name="credit"
                      value={credit}
                      onChange={handleChange}
                      type="number"
                      placeholder=""
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label">Course Code</label>
                  <div className="col-md-4">
                    <input
                      id="textinput"
                      name="code"
                      value={code}
                      onChange={handleChange}
                      type="text"
                      placeholder=""
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>

                {/* <div className="form-group">
                                <label className="col-md-4 control-label" for="textinput4">No of Sections</label>
                                <div className="col-md-4">
                                    <input id="textinput4" name={no_of_sections} value={no_of_sections} onChange={handleChange} type="number" placeholder="" className="form-control input-md"
                                        required="" />

                                </div>
                            </div> */}
                <div className="form-group">
                  <label className="col-md-4 control-label">
                    No Of Sections
                  </label>
                  <div className="col-md-4">
                    <input
                      name="no_of_sections"
                      value={no_of_sections}
                      onChange={handleChange}
                      type="number"
                      placeholder=""
                      className="form-control input-md"
                      required=""
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label">Course Type</label>
                  <div className="col-md-4">
                    <select
                      className="option form-select"
                      name="type"
                      value={type}
                      onChange={handleChange}
                    >
                      <option value="lab">Lab</option>
                      <option value="theory">Theory</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-md-4 mt-4">
                    <button
                      id="button"
                      type="submit"
                      name="button"
                      className="btn btn-primary"
                    >
                      Add course
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

export default AddCourse;
