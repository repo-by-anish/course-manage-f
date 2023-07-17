import React, { useEffect, useRef, useState } from 'react'
import "./StudentDash.css"
import { useGetCourseQuery } from '../usersApiSlice';
import useAuth from '../../../hooks/useAuth';
import { useGetAssignmentsQuery } from '../../assignment/assignmentsApiSlice';
import { useSendLogoutMutation } from '../../login/authApiSlice';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          cancle
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const StudentDashboard = () => {
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




  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const { foundUser } = useAuth()
  const {
    data: assignments,
    isSuccess: asgmtSuccess,
    isLoading: asgmtLoading,
    isError: asgmtIsError,
    error: asgmtError
  } = useGetAssignmentsQuery("assignmentList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const profileComponent =
    <div className="s__update-form-container">
      <h2>Student Profile</h2>
      <form className="s__update-form">
        <div className="s__form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={foundUser.firstName}
            readOnly
          />
        </div>
        <div className="s__form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={foundUser.lastName}
            readOnly
          />
        </div>
        <div className="s__form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={foundUser.email}
            readOnly
          />
        </div>
        <div className="s__form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={foundUser.studentId}
            readOnly
          />
        </div>
      </form>
    </div>
  let assignmentsArray = [];
  if (asgmtSuccess) {
    assignmentsArray = assignments ? Object.values(assignments.entities) : [];
  }
  let AssignmentViewer = null
  let courses = foundUser?.coursesEnrolled;
  let assignmentArray = []

  const getRelativePath = (assignment) => {
    const filePath = assignment.assignmentFile
    const startIndex = filePath.indexOf("static");
    const relativePath = filePath.substring(startIndex).replace(/\\/g, "/");
    return relativePath
  }
  const getRelativePathCrs = (crs) => {
    const filePath = crs.syllabus
    const startIndex = filePath.indexOf("static");
    const relativePath = filePath.substring(startIndex).replace(/\\/g, "/");
    return relativePath
  }
  if (assignmentsArray.length) {
    assignmentArray = assignmentsArray.filter(assignment => courses.some(course => course._id === assignment?.courseId._id));
    AssignmentViewer = <div className="s__assignment-grid">
      {assignmentArray.map((assignment) => (
        <div className="s__assignment-card" key={assignment?.id}>
          <h3 className="s__assignment-name">{assignment?.title}</h3>
          <p className="s__deadline">Assigned By:- {assignment?.assignedBy?.firstName + " " + assignment?.assignedBy?.firstName}</p>
          <p className="s__deadline">Deadline: {assignment?.duration}</p>
          <p className="s__deadline">Semester: {assignment?.semester}</p>
          <button onClick={() => { window.open(`http://localhost:3500/${getRelativePath(assignment)}`) }} className="s__view-button">View</button>
        </div>
      ))}
    </div>
  }

  let CourseViewer =
    <div className="s__assignment-grid">
      {courses.map((course) => (
        <div className="s__assignment-card" key={course._id}>
          <h3 className="s__assignment-name">{course?.title}</h3>
          <button onClick={() => { window.open(`http://localhost:3500/${getRelativePathCrs(course)}`) }} className="s__view-button">View</button>
        </div>
      ))}
    </div>

  const paymentPage = (
    <div className="payment-container">
      <div className="payment-box">
        <div className="payment-info-box">
          <div className="payment-label">Total Fee:</div>
          <div className="payment-value">₹160,000</div>
        </div>
        <div className="payment-info-box">
          <div className="payment-label">Per Semester Fee:</div>
          <div className="payment-value">₹20,000</div>
        </div>
        <div className="payment-info-box">
          <div className="payment-label">Fee Paid:</div>
          <div className="payment-value">₹80,000</div>
        </div>
        <div className="payment-info-box">
          <div className="payment-label">Remaining Payment:</div>
          <div className="payment-value">₹80,000</div>
        </div>
        <div className="payment-button-box">
          <button onClick={handleClickOpen} className="payment-button">Make Payment Now</button>
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
  const handleCoursesClick = () => {
    setnavStage("course")
  }
  const handleProfileClick = () => {
    setnavStage("prof")
  }
  const handleAssignmentClick = () => {
    setnavStage("assign")
  }
  const handlePaymentClick = () => {
    setnavStage("payment")
  }
  const handleGrievenceClick = () => {
    setnavStage("Grievence")
  }

  if (navStage === "prof") {
    viewComponent = profileComponent
  }
  if (navStage === "assign") {
    viewComponent = AssignmentViewer
  }
  if (navStage === "course") {
    viewComponent = CourseViewer
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
        <MenuIcon onClick={togChng} sx={{paddingRight:"1rem", width:"2rem",height:"2rem"}}/>
      </div>
      <div className='stu__dash'>
        <div onClick={togChng} className={isOpenTog ? "stu__dash__left_toggle" : "stu__dash__left"}>
          <div onClick={handleProfileClick} className="s-dash-l">
            Profile
          </div>
          <div onClick={handleCoursesClick} className="s-dash-l">
            Courses Enrolled
          </div>
          <div onClick={handleAssignmentClick} className="s-dash-l">
            Assignment
          </div>
          <div onClick={handlePaymentClick} className="s-dash-l">
            Payment
          </div>
          <div onClick={handleGrievenceClick} className="s-dash-l">
            Send Grievence
          </div>
          <div onClick={() => sendLogout()} className="s-dash-l">
            Logout
          </div>
        </div>
        <div className="stu__dash__right"></div>
        {viewComponent}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Semester Fee
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Make Payment and Enter UTR No Below
            </Typography>
          </DialogContent>
          <DialogContent dividers>
            <Typography gutterBottom>
              <img src="../payment.jpg" alt="" />
            </Typography>
          </DialogContent>
          <DialogContent dividers>
            <Typography gutterBottom>
              <input type="text" />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Send
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  )
}

export default StudentDashboard