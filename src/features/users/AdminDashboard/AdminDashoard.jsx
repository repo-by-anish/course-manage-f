import React, { useEffect, useRef, useState } from 'react'
import "./AdminDash.css"
import { useGetCourseQuery, useGetInstructorQuery, useGetPrincipalsQuery, useGetStudentsQuery } from '../usersApiSlice';
import useAuth from '../../../hooks/useAuth';
import { useSendLogoutMutation } from '../../login/authApiSlice';
import { useNavigate } from 'react-router-dom';
import CourseList from '../../course/CourseList';
import StudentList from '../StudentList';
import InstructorList from "../InstructorList"
import CreateStudentForm from '../CreateStudentForm';
import CreateInstructorForm from '../CreateInstructorForm';
import MenuIcon from '@mui/icons-material/Menu';
import CreatePrincipalForm from '../CreatePrincipalForm';
import CourseCreateForm from '../../course/CourseCreateForm';
import PrincipalList from '../PrincipalList';
import CreateAdminForm from '../AdminCreaterForm';
const AdminDashboard = () => {


    const [isOpenTog, setIsOpenTog] = useState(false);
    const windowSize = useRef(window.innerWidth);
    console.log(windowSize);
    const togChng = () => {
        if (windowSize.current < 600) {
            setIsOpenTog(prev => !prev)
        }
    }

    const [paymentList, setPayment] = useState([
        { name: 'Anish Kumar', semester: 'even 2023', amount: "₹20,000", utrId: "ABC" },
        { name: 'Mukesh Kumar', semester: 'odd 2022', amount: "₹20,000", utrId: "ACC" },
        { name: 'Mike Johnson', semester: 'even 2023', amount: "₹20,000", utrId: "ABM" },
    ]);

    const handleApprovePayment = (name) => {
        // Perform the necessary action to approve the payment
        setPayment(prev => prev.filter(pay => pay.name !== name))
        alert(`Payment approved for ${name}`);
    };
    const [grvIdx, setGrvIdx] = useState(0)

    const [grievanceList, setGrievanceList] = useState([
        { sendBy: 'John Doe', relatedTo: 'Admissions', message: 'Applied for addmission in a new course but didnot recived and return mail.' },
        { sendBy: 'Jane Smith', relatedTo: 'Library', message: 'Many of books related to semester syllabus not found in library.' },
        { sendBy: 'Mike Johnson', relatedTo: 'Examinations', message: 'I want to apply for recheck my examination sheets.' },
    ])

    const handleDeleteGrievance = (index) => {
        setGrievanceList(prev => prev.filter((_, idx) => idx !== index))
        alert(`Deleting grievance at index ${index}`);
    };

    const handleDeclinePayment = (name) => {
        // Perform the necessary action to decline the payment
        setPayment(prev => prev.filter(pay => pay.name !== name))
        alert(`Payment declined for ${name}`);
    };
    let grievanceComponent;

    const handleViewGravience = (idx) => {
        setGrvIdx(idx)
    }
    const grievanceToView = grievanceList[grvIdx];
    if (grvIdx > -1) {
        grievanceComponent = (
            <div>
                <h2>Send By: {grievanceToView.sendBy}</h2>
                <h3>Related To: {grievanceToView.relatedTo}</h3>
                <p>Message: {grievanceToView.message}</p>
            </div>
        )
    }

    const [navStage, setnavStage] = useState("");
    const navigate = useNavigate();

    const [sendLogout, {
        isSuccess,
    }] = useSendLogoutMutation()

    const {
        data: course,
        isSuccess: crsSuccess
    } = useGetCourseQuery();
    const {
        data: instructor,
        isSuccess: insSuccess
    } = useGetInstructorQuery()
    const {
        data: principal,
        isSuccess: priSuccess
    } = useGetPrincipalsQuery()
    const {
        data: student,
        isSuccess: stuSuccess
    } = useGetStudentsQuery()

    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
        }
    }, [isSuccess, navigate])

    const { foundUser } = useAuth()

    let totalInstructors = 0;
    let totalPrincipals = 0;
    let totalStudents = 0;
    let totalCourse = 0;

    if (stuSuccess && insSuccess && priSuccess && crsSuccess) {
        totalInstructors = instructor?.ids?.length
        totalPrincipals = principal?.ids?.length
        totalStudents = student?.ids?.length
        totalCourse = course?.ids?.length
    }

    const homeComponent = (
        <div className="admin-home-container">
            <div className="admin-box student">
                <h3>Total Students</h3>
                <p>{totalStudents}</p>
            </div>
            <div className="admin-box instructor">
                <h3>Total Instructors</h3>
                <p>{totalInstructors}</p>
            </div>
            <div className="admin-box principal">
                <h3>Total Principals</h3>
                <p>{totalPrincipals}</p>
            </div>
            <div className="admin-box course">
                <h3>Total Course</h3>
                <p>{totalCourse}</p>
            </div>
        </div>
    )

    const paymentPage = (
        <table className="payment-table">
            <thead>
                <tr>
                    <th>Name of Student</th>
                    <th>Semester</th>
                    <th>Received Fee Amount</th>
                    <th>UTR ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {paymentList.map((payment, index) => (
                    <tr key={index}>
                        <td>{payment.name}</td>
                        <td>{payment.semester}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.utrId}</td>
                        <td>
                            <button
                                onClick={() => handleApprovePayment(payment.name)}
                                className="approve-button"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleDeclinePayment(payment.name)}
                                className="decline-button"
                            >
                                Decline
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const GrievencetForm = (
        <div>
            <table className="grievance-list-table">
                <thead>
                    <tr>
                        <th>Send By</th>
                        <th>Related To</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {grievanceList.map((grievance, index) => (
                        <tr key={index}>
                            <td>{grievance.sendBy}</td>
                            <td>{grievance.relatedTo}</td>
                            <td>{grievance.message.substring(0, 70)}...</td>
                            <td>
                                <button onClick={() => handleViewGravience(index)} className="view-button">View</button>
                                <button onClick={() => handleDeleteGrievance(index)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {grievanceComponent}
        </div>
    )

    let viewComponent = homeComponent
    const handleCoursesClick = () => {
        setnavStage("course")
    }
    const handleAddCoursesClick = () => {
        setnavStage("addcourse")
    }
    const handleHomeClick = () => {
        setnavStage("home")
    }
    const handleStudentClick = () => {
        setnavStage("student")
    }
    const handleAddStudentClick = () => {
        setnavStage("addstudent")
    }
    const handleAddPrincipalClick = () => {
        setnavStage("addprincipal")
    }
    const handlePrincipalClick = () => {
        setnavStage("principal")
    }
    const handleInstructorClick = () => {
        setnavStage("instructor")
    }
    const handleAddInstructorClick = () => {
        setnavStage("addinstructor")
    }
    const handlePaymentClick = () => {
        setnavStage("payment")
    }
    const handleGrievenceClick = () => {
        setnavStage("Grievence")
    }
    const handleAddAdminClick = () => {
        setnavStage("admin")
    }

    if (navStage === "home") {
        viewComponent = homeComponent
    }
    if (navStage === "admin") {
        viewComponent = <CreateAdminForm />
    }
    if (navStage === "student") {
        viewComponent = <StudentList />
    }
    if (navStage === "addstudent") {
        viewComponent = <CreateStudentForm />
    }
    if (navStage === "addprincipal") {
        viewComponent = <CreatePrincipalForm />
    }
    if (navStage === "principal") {
        viewComponent = <PrincipalList />
    }
    if (navStage === "instructor") {
        viewComponent = <InstructorList />
    }
    if (navStage === "addinstructor") {
        viewComponent = <CreateInstructorForm />
    }
    if (navStage === "course") {
        viewComponent = <CourseList />
    }
    if (navStage === "addcourse") {
        viewComponent = <CourseCreateForm />
    }
    if (navStage === "payment") {
        viewComponent = paymentPage
    }
    if (navStage === "Grievence") {
        viewComponent = GrievencetForm
    }

    return (
        <>
            <div className="tglbtn">
                <MenuIcon onClick={togChng} sx={{ paddingRight: "1rem", width: "2rem", height: "2rem" }} />
            </div>
            <div className='adm__dash'>
            <div onClick={togChng} className={isOpenTog ? "pri__dash__left_toggle" : "pri__dash__left"}>
                    <div onClick={handleHomeClick} className="a-dash-l">
                        Home
                    </div>
                    <div onClick={handleCoursesClick} className="a-dash-l">
                        Courses
                    </div>
                    <div onClick={handleAddCoursesClick} className="a-dash-l">
                        Add Courses
                    </div>
                    <div onClick={handleAddStudentClick} className="a-dash-l">
                        Add Students
                    </div>
                    <div onClick={handleStudentClick} className="a-dash-l">
                        Students
                    </div>
                    <div onClick={handleAddInstructorClick} className="a-dash-l">
                        Add Instructor
                    </div>
                    <div onClick={handleInstructorClick} className="a-dash-l">
                        Instructor
                    </div>
                    <div onClick={handleAddPrincipalClick} className="a-dash-l">
                        Add Principals
                    </div>
                    <div onClick={handlePrincipalClick} className="a-dash-l">
                        Principals
                    </div>
                    <div onClick={handleAddAdminClick} className="a-dash-l">
                        Add Admin
                    </div>
                    <div onClick={handlePaymentClick} className="a-dash-l">
                        Payments
                    </div>
                    <div onClick={handleGrievenceClick} className="a-dash-l">
                        view Grievence
                    </div>
                    <div onClick={() => sendLogout()} className="a-dash-l">
                        Logout
                    </div>
                </div>
                <div className="adm__dash__right">
                    {viewComponent}
                </div>

            </div>
        </>
    )
}

export default AdminDashboard