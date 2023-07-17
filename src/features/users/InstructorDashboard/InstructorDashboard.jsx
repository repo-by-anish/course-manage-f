import React, { useEffect, useRef, useState } from 'react'
import "./instructorDash.css"
import useAuth from '../../../hooks/useAuth';
import { useSendLogoutMutation } from '../../login/authApiSlice';
import { useNavigate } from 'react-router-dom';
import AssignmentList from '../../assignment/AssignmentList';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentCreatorForm from '../../assignment/AssignmentCreatorForm';
import StudentList from '../StudentList';

const InstructorDashboard = () => {

  let isDisabled = true

  const [isOpenTog, setIsOpenTog] = useState(false);
  const windowSize = useRef(window.innerWidth);
  console.log(windowSize);
  const togChng = () => {
    if(windowSize.current<600){
      setIsOpenTog(prev => !prev)
    }
  }

  const [navStage, setnavStage] = useState("");
  const navigate = useNavigate();

  const [sendLogout, {
    isSuccess,
    // isLoading,
    // isError,
    // error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate("/login")
    }
  }, [isSuccess, navigate])

  const { foundUser } = useAuth()
  const profileComponent = (<div className="i__update-form-container">
    {!isDisabled ? <h2>Update Instructor</h2> : <h2>Instructor Profile</h2>}
    <form className="i__update-form">
      <div className="i__form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          disabled={isDisabled}
          type="text"
          id="firstName"
          name="firstName"
          value={foundUser.firstName}
        // onChange={handleChange}
        />
      </div>
      <div className="i__form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          disabled={isDisabled}
          id="lastName"
          name="lastName"
          value={foundUser.lastName}
        // onChange={handleChange}
        />
      </div>
      <div className="i__form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          disabled={isDisabled}
          id="email"
          name="email"
          value={foundUser.email}
        // onChange={handleChange}
        />
      </div>
      <div className="i__form-group">
        <label htmlFor="pridentId">Expertise: </label>
        <input
          type="text"
          id="pridentId"
          name="pridentId"
          disabled={isDisabled}
          value={foundUser.expertise}
        // onChange={handleChange}
        />
      </div>
      {!isDisabled ? <button disabled={isDisabled} type="submit">Update</button> : null}
    </form>
  </div>)
  const paymentPage = (
    <div className="payment-container">
      <div className="payment-box">
        <div className="payment-info-box">
          <div className="payment-label">Your Monthly:</div>
          <div className="payment-value">₹60,000</div>
        </div>
        <div className="payment-info-box">
          <div className="payment-label">Total Payouts:</div>
          <div className="payment-value">₹120,000</div>
        </div>
        <div className="payment-info-box">
          <div className="payment-label">Remaining Payment(This month):</div>
          <div className="payment-value">₹60,000</div>
        </div>
        <div className="payment-button-box">
          <button onClick={() => alert("Request Sent...")} className="payment-button">Request Payment Now</button>
        </div>
      </div>
    </div>
  )

  const GrievencetForm = (
    <form className="gravity-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />
      </div>
      <div className="form-group">
        <label htmlFor="relatedTo">Related To:</label>
        <input type="text" id="relatedTo" name="relatedTo" placeholder="Enter related information" required />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" placeholder="Enter your message" required></textarea>
      </div>
      <div className="form-group">
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
  )

  let viewComponent = profileComponent
  const handleAssignment = () => {
    setnavStage("assign")
  }
  const handleProfileClick = () => {
    setnavStage("prof")
  }
  const handleAddAssignment = () => {
    setnavStage("addAssgn")
  }
  const handlePaymentClick = () => {
    setnavStage("payment")
  }
  const handleGrievenceClick = () => {
    setnavStage("Grievence")
  }
  const handleStudentClick = () => {
    setnavStage("student")
  }

  if (navStage === "prof") {
    viewComponent = profileComponent
  }
  if (navStage === "assign") {
    viewComponent = <AssignmentList />
  }
  if (navStage === "addAssgn") {
    viewComponent = <AssignmentCreatorForm />
  }
  if (navStage === "payment") {
    viewComponent = paymentPage
  }
  if (navStage === "student") {
    viewComponent = <StudentList />
  }
  if (navStage === "Grievence") {
    viewComponent = GrievencetForm
  }

  return (
    <>
      <div className="tglbtn">
        <MenuIcon onClick={togChng} sx={{ paddingRight: "1rem", width: "2rem", height: "2rem" }} />
      </div>
      <div className='stu__dash'>
        <div onClick={togChng} className={isOpenTog ? "pri__dash__left_toggle" : "pri__dash__left"}>
          <div onClick={handleProfileClick} className="p-dash-l">
            Profile
          </div>
          <div onClick={handleAssignment} className="p-dash-l">
            Assignments
          </div>
          <div onClick={handleStudentClick} className="p-dash-l">
            Students
          </div>
          <div onClick={handleAddAssignment} className="p-dash-l">
            Add Assignment
          </div>
          <div onClick={handlePaymentClick} className="p-dash-l">
            Payment
          </div>
          <div onClick={handleGrievenceClick} className="p-dash-l">
            Send Grievence
          </div>
          <div onClick={() => sendLogout()} className="p-dash-l">
            Logout
          </div>
        </div>
        <div className="pri__dash__right"></div>
        {viewComponent}
      </div>
    </>
  )
}

export default InstructorDashboard