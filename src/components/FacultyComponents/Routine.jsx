import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";
const Routine = () => {
  const [allTimeslots, setAllTimeSlots] = useState([]);
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
      .get("http://127.0.0.1:8000/get_faculty_routine", { headers })
      .then((response) => {
        console.log(response.data);
        setAllTimeSlots(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <header>
        <div className="logosec">
          <div className="logo">Faculty Panel</div>
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
                  <Link to="/faculty/home">Dashboard </Link>
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
                    to="/faculty/offered-courses"
                    style={{ textDecoration: "none" }}
                  >
                    Offered Courses
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
                    to="/faculty/routine"
                    style={{ textDecoration: "none" }}
                  >
                    Routine
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
              <h1 className="recent-Articles">Time Slots</h1>
            </div>

            <div className="report-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Course Name</th>
                    <th scope="col">Course Code</th>
                    <th scope="col" className="text-center">
                      Time Slot{" "}
                    </th>
                    <th scope="col">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {allTimeslots?.map((slot) => {
                    console.log(slot);
                    return (
                      <>
                        <tr>
                          <th scope="row">{slot.course.name}</th>
                          <td>{slot.course.code}</td>
                          <td className="text-center">{slot.time_slot.name}</td>
                          <td>{slot.classroom.roomNo}</td>
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

export default Routine;
