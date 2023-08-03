import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../App.css";
import { getRoleInfo } from "../../features/roleSlice";
const AdminHome = () => {
  const [coursesCount, setCoursesCount] = useState(0);
  const [classroomCount, setClassroomCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    try {
      axios
        .get("http://127.0.0.1:8000/get_all_course", { headers })
        .then((res1) => {
          console.log(res1?.data?.length);
          setCoursesCount(res1.data.length);
          return axios.get("http://127.0.0.1:8000/get_all_faculty", {
            headers,
          });
        })
        .then((res2) => {
          console.log(res2.data.length);
          setFacultyCount(res2.data.length);
          return axios.get("http://127.0.0.1:8000/get_all_classroom", {
            headers,
          });
        })
        .then((res3) => {
          console.log(res3.data.length);
          setClassroomCount(res3.data.length);
        });
      // const resq1 = axios.get("http://127.0.0.1:8000/get_all_course");
      // const resq2 = axios.get("http://127.0.0.1:8000/get_all_faculty", { headers });
      // const resq3 = axios.get("http://127.0.0.1:8000/get_all_classroom", { headers });
      // Promise.all([resq1, resq2, resq3])
      //     .then(responses => {
      //         // Handle the responses
      //         const response1 = responses[0].data.length;
      //         const response2 = responses[1].data.length;
      //         const response3 = responses[2].data.length;
      //         setCoursesCount(response1);
      //         setFacultyCount(response2);
      //         setClassroomCount(response3)
      //         // Process the responses as needed
      //         console.log(response1);
      //         console.log(response2);
      //         console.log(response3);
      //     })
      //     .catch(error => {
      //         // Handle errors
      //         console.error(error);
      //     });
    } catch (error) {
      console.error(error);
    }
  }, []);
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
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
          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">{coursesCount}</h2>
                <h2 className="topic">All courses</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                alt="Views"
              />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">{facultyCount}</h2>
                <h2 className="topic">All Faculties</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                alt="comments"
              />
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="topic-heading">{classroomCount}</h2>
                <h2 className="topic">Classroom</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                alt="published"
              />
            </div>
          </div>

          {/* <div className="report-body">
                            <div className="report-topic-heading">
                                <h3 className="t-op">Article</h3>
                                <h3 className="t-op">Views</h3>
                                <h3 className="t-op">Comments</h3>
                                <h3 className="t-op">Status</h3>
                            </div>

                            <div className="items">
                                <div className="item1">
                                    <h3 className="t-op-nextlvl">Article 73</h3>
                                    <h3 className="t-op-nextlvl">2.9k</h3>
                                    <h3 className="t-op-nextlvl">210</h3>
                                    <h3 className="t-op-nextlvl label-tag">Published</h3>
                                </div>
                            </div>
                        </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
