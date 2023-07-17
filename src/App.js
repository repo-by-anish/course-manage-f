import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import AssignmentList from "./features/assignment/AssignmentList";
import AssignmentCreatorForm from "./features/assignment/AssignmentCreatorForm";
import InstructorList from "./features/users/InstructorList";
import StudentDashboard from "./features/users/StudentDashoard/StudentDashboard";
import CreateStudentForm from "./features/users/CreateStudentForm";
import CreateInstructorForm from "./features/users/CreateInstructorForm";
import CreatePrincipalForm from "./features/users/CreatePrincipalForm";
import CourseList from "./features/course/CourseList";
import CourseCreateForm from "./features/course/CourseCreateForm";
import LoginLayout from "./components/LoginLayout";
import LoginLinks from "./features/login/LoginLinks";
import AdminLogin from "./features/login/AdminLogin";
import PrincipalLogin from "./features/login/PrincipalLogin";
import StudentLogin from "./features/login/StudentLogin";
import InstructorLogin from "./features/login/InstructorLogin";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/login/RequireAuth";
import PersistLogin from "./features/login/PersistLogin";
import PrincipalDashboard from "./features/users/PrincipalDashBoard/PrincipalDashboard";
import InstructorDashboard from "./features/users/InstructorDashboard/InstructorDashboard";
import AdminDashboard from "./features/users/AdminDashboard/AdminDashoard";
// demos
// demos


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<CreateStudentForm />} />
        <Route path="login" element={<LoginLayout />}>
          <Route index element={<LoginLinks />} />
          <Route path="student" element={<StudentLogin />} />
          <Route path="instructor" element={<InstructorLogin />} />
          <Route path="principal" element={<PrincipalLogin />} />
          <Route path="admin" element={<AdminLogin />} />
        </Route>
        <Route path="dash" element={<DashLayout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
              <Route path="student">
                {/* <Route index element={<StudentList />} /> */}
                <Route path="new" element={<CreateStudentForm />} />
                <Route index element={<StudentDashboard />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Instructor]} />}>
              <Route path="instructor">
                <Route index element={<InstructorDashboard />} />
                <Route path="new" element={<CreateInstructorForm />} />
              </Route>
              <Route path="assignment">
                <Route index element={<AssignmentList />} />
                <Route path="new" element={<AssignmentCreatorForm />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Pricipal]} />}>
              <Route path="principal">
                <Route index element={<PrincipalDashboard />} />
                <Route path="new" element={<CreatePrincipalForm />} />
              </Route>
              <Route path="course">
                <Route index element={<CourseList />} />
                <Route path="new" element={<CourseCreateForm />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
