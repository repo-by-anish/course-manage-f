import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
// protecting routes
const RequireAuth = ({allowedRoles}) => {
    const {status, foundUser}= useAuth()
    const location= useLocation()
    console.log(allowedRoles);
    console.log(status);
    console.log(foundUser);
    const content= (
        allowedRoles.indexOf(status)!==-1
        ?<Outlet/>
        : <Navigate to="/login" state={{from: location}} replace/>
    )
    return content;
}

export default RequireAuth