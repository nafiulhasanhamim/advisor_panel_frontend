import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../App.css";
import { getRoleInfo } from "../../features/roleSlice";
const FacultyHome = () => {
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
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
        <div className="main"></div>
      </div>
    </>
  );
};

export default FacultyHome;
