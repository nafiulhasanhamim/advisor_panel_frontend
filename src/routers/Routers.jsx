import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Error from "../pages/Error";
import Login from "../components/Login";
import FacultyHome from "../components/FacultyComponets/FacultyHome";
import Routine from "../components/FacultyComponets/Routine";
import OfferedCourses from "../components/FacultyComponets/OfferedCourses";
import AdminHome from "../components/AdminComponents/AdminHome";
import AddFaculty from "../components/AdminComponents/AddFaculty";
import AddCourse from "../components/AdminComponents/AddCourse";
import AllCourses from "../components/AdminComponents/AllCourses";
import CreateClassroom from "../components/AdminComponents/CreateClassroom";
import AllFaculties from "../components/AdminComponents/AllFaculties";
import Logout from "../components/Logout";

function Routers() {
  const roleinfo = useSelector((state) => state.roleinfo.roleinfo);
  return (
    <BrowserRouter>
      <Routes>
        {roleinfo?.role === "Faculty" && (
          <Route path="/faculty/home" element={<FacultyHome />} />
        )}
        {roleinfo?.role === "Faculty" && (
          <Route path="/faculty/offered-courses" element={<OfferedCourses />} />
        )}

        {roleinfo?.role === "Faculty" && (
          <Route path="/faculty/routine" element={<Routine />} />
        )}
        {roleinfo?.role === "Admin" && (
          <Route path="/admin/home" element={<AdminHome />} />
        )}
        {roleinfo?.role === "Admin" && (
          <Route path="/admin/all-faculties" element={<AllFaculties />} />
        )}
        {roleinfo?.role === "Admin" && (
          <Route path="/admin/add-faculty" element={<AddFaculty />} />
        )}
        {roleinfo?.role === "Admin" && (
          <Route path="/admin/add-course" element={<AddCourse />} />
        )}

        {roleinfo?.role === "Admin" && (
          <Route path="/admin/create-classroom" element={<CreateClassroom />} />
        )}

        {roleinfo?.role === "Admin" && (
          <Route path="/admin/all-courses" element={<AllCourses />} />
        )}

        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<AdminHome />} /> */}

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
