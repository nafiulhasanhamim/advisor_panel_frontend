import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../App.css";
import axios from "axios";
import { getRoleInfo } from "../../features/roleSlice";
const OfferedCourses = () => {
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const [codes, setCodes] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = axios
          .get("http://127.0.0.1:8000/get_all_course")
          .then((res) => {
            setMsg("course get api");
            res.data.map((data) => {
              setCodes((prev) => [...prev, data.code]);
            });
          });
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // console.log(codes)
  const [selectedCode, setSelectedCode] = useState(codes[0]);
  const [selectedCodeMsg, setSelectedCodeMsg] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "code") {
      console.log(e.target.value);
      setSelectedCode(e.target.value);
    }
    if (e.target.name === "timeslot") {
      setSelectedTime(e.target.value);
    }
  };
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const token = userinfo?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  const handleSubmit = async (e) => {
    console.log(e.target.value);
    e.preventDefault();
    console.log(msg);
    if (msg === "course get api") {
      setSelectedCodeMsg("code is selected");
      const resp1 = await axios
        .post(
          "http://127.0.0.1:8000/get_all_course",
          { faculty_initial: "TBA", code: selectedCode || codes[0] },
          {
            headers,
          }
        )
        .then((resp1) => {
          setMsg("course post api");
          setAllCourse(resp1.data);
          for (let i = 0; i < resp1.data.length; i++) {
            if (resp1.data[i].time_slot.available === false) {
              setTimeSlots((prev) => [...prev, resp1.data[i].time_slot.name]);
            }
          }
        });
    }
    if (msg === "course post api") {
      if (!selectedTime) {
        const filteredData = allCourse.filter(
          (course) => course.time_slot.name === timeSlots[0]
        );
        console.log(filteredData);
        const values = {
          section_no: Number(filteredData[0].no),
          course_code: filteredData[0].course.code,
          time_slot_id: Number(filteredData[0].time_slot.slot),
          room_no: Number(filteredData[0].classroom.roomNo),
        };
        console.log(values);
        const resp1 = await axios
          .post(
            "http://127.0.0.1:8000/take_course",
            { values },
            {
              headers,
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const filteredData = allCourse.filter(
          (course) => course.time_slot.name === selectedTime
        );
        const values = {
          section_no: Number(filteredData[0].no),
          course_code: filteredData[0].course.code,
          time_slot_id: Number(filteredData[0].time_slot.slot),
          room_no: Number(filteredData[0].classroom.roomNo),
        };
        console.log(values);
        const resp1 = await axios
          .post(
            "http://127.0.0.1:8000/take_course",
            { values },
            {
              headers,
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
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
        <div className="main">
          <form class="form-horizontal m-5" onSubmit={handleSubmit}>
            <fieldset>
              {selectedCodeMsg.length === 0 && (
                <>
                  <div class="form-group">
                    <label class="col-md-4 control-label">Course Code</label>
                    <div class="col-md-4">
                      <select
                        id="coursetype"
                        name="code"
                        value={selectedCode}
                        onChange={handleChange}
                        class="form-select"
                      >
                        {codes?.map((code) => {
                          return (
                            <>
                              <option value={code}>{code}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-4 mt-4">
                      <button id="button" type="submit" class="btn btn-primary">
                        submit
                      </button>
                    </div>
                  </div>
                </>
              )}
              {selectedCodeMsg === "code is selected" && (
                <>
                  <div class="form-group">
                    <label class="col-md-4 control-label">
                      Time Slots Code
                    </label>
                    <div class="col-md-4">
                      <select
                        id="coursetype"
                        name="timeslot"
                        value={selectedTime}
                        onChange={handleChange}
                        class="form-select"
                      >
                        {timeSlots?.map((timeslot) => {
                          return (
                            <>
                              <option value={timeslot}>{timeslot}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-4 mt-4">
                      <button id="button" type="submit" class="btn btn-primary">
                        submit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default OfferedCourses;
