import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const [facultyRegister, setFacultyRegister] = useState({
    name: "",
    initial: "",
    designation: "Lecturer",
    email: "",
    room: 0,
    mobile: "",
  });

  const { name, initial, designation, email, room, mobile } = facultyRegister;
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
    setFacultyRegister((prev) => ({
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
        .post(
          "http://127.0.0.1:8000/send_mail",
          { email, username: initial },
          {
            headers,
          }
        )
        .then((res1) => {
          console.log(res1?.data?.password);

          return axios.post(
            "http://127.0.0.1:8000/faculty_register",
            {
              ...facultyRegister,
              username: initial,
              password: res1.data.password,
            },
            {
              headers,
            }
          );
        })
        .then((res2) => {
          console.log(res2.data.message);
          if (res2.data.message === `${initial}  Registration successful`) {
            successMessage(res2.data.message);
            setFacultyRegister({
              name: "",
              initial: "",
              designation: "",
              email: "",
              room: 0,
              mobile: "",
            });
          } else {
            errorMessage(res2.data.message);
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
              <h1 className="recent-Articles">Create Faculty</h1>
            </div>

            <form class="form-horizontal m-5" onSubmit={handleSubmit}>
              <fieldset>
                <div class="form-group">
                  <label class="col-md-4 control-label">Faculty Name</label>
                  <div class="col-md-4">
                    <input
                      id="textinput"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      type="text"
                      placeholder=""
                      class="form-control input-md"
                      required=""
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label">Faculty Initial</label>
                  <div class="col-md-4">
                    <input
                      id="textinput3"
                      name="initial"
                      value={initial}
                      onChange={handleChange}
                      type="text"
                      placeholder=""
                      class="form-control input-md"
                      required=""
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label">Designation</label>
                  <div class="col-md-4">
                    <select
                      id="coursetype"
                      name="designation"
                      value={designation}
                      onChange={handleChange}
                      class="form-select"
                    >
                      <option value="Lecturer">Lecturer</option>
                      <option value="Assistant Professor">
                        Assistant Professor
                      </option>
                      <option value="Professor">Professor</option>
                      <option value="Senior Lecturer">Senior Lecturer</option>
                      <option value="Junior Lecturer">Junior Lecturer</option>
                      <option value="Assistant Professor">
                        Associate Professor
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label">Email</label>
                  <div class="col-md-4">
                    <input
                      id="textinput4"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      type="email"
                      placeholder=""
                      class="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label">Room</label>
                  <div class="col-md-4">
                    <input
                      id="textinput4"
                      name="room"
                      value={room}
                      onChange={handleChange}
                      type="number"
                      placeholder=""
                      class="form-control input-md"
                      required=""
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label">Mobile</label>
                  <div class="col-md-4">
                    <input
                      id="textinput4"
                      name="mobile"
                      value={mobile}
                      onChange={handleChange}
                      type="text"
                      placeholder=""
                      class="form-control input-md"
                      required=""
                    />
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-md-4 mt-4">
                    <button id="button" type="submit" class="btn btn-primary">
                      Add Faculty
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

export default AddFaculty;
