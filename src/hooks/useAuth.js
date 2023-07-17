
import jwtDecode from "jwt-decode"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/login/authSlice"
const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    console.log(token);
    let status = null

    if (token) {
        const decoded = jwtDecode(token)
        console.log(decoded);
        const { foundUser, role } = decoded.UserInfo
        status=role;
        return { foundUser, status }

    }

    return { foundUser:{},status:null }
}

export default useAuth