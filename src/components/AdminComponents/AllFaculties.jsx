import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";
const AllFaculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get_all_faculty", { headers })
      .then((response) => {
        console.log(response);
        setFaculties(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
              <h1 className="recent-Articles">All Faculties</h1>
            </div>

            <div className="report-body">
              {/* <div className="report-topic-heading">
                                <h3 className="t-op">Course Id</h3>
                                <h3 className="t-op">Course Name</h3>
                                <h3 className="t-op">Course Code</h3>
                                <h3 className="t-op">Course Credit</h3>
                                <h3 className="t-op">Type</h3>
                                <h3 className="t-op">No. Of Sections</h3>
                            </div>
                            {
                                courses?.map((course) => {
                                    const { id, code, name, credit, type, number_of_section } = course;
                                    return (
                                        <>

                                            <div className="items">
                                                <div className="item1">
                                                    <h3 className="t-op-nextlvl">{id}</h3>
                                                    <h3 className="t-op-nextlvl">{name}</h3>
                                                    <h3 className="t-op-nextlvl">{code}</h3>
                                                    <h3 className="t-op-nextlvl label-tag">{credit}</h3>
                                                    <h3 className="t-op-nextlvl label-tag">{type}</h3>
                                                    <h3 className="t-op-nextlvl label-tag">{number_of_section}</h3>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            } */}
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Faculty ID</th>
                    <th scope="col">Faculty Name</th>
                    <th scope="col">Initial</th>
                    <th scope="col">Designation</th>
                    <th scope="col" className="text-center">
                      Email
                    </th>
                    <th scope="col">Room no.</th>
                  </tr>
                </thead>
                <tbody>
                  {faculties?.map((faculty) => {
                    const { id, name, initial, designation, email, room } =
                      faculty;
                    return (
                      <>
                        <tr>
                          <th scope="row">{id}</th>
                          <td>{name}</td>
                          <td>{initial}</td>
                          <td>{designation}</td>
                          <td>{email}</td>
                          <td>{room}</td>
                          {/* <td className='text-center'>{number_of_section}</td> */}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFaculties;
