import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useAdminRefreshMutation, useInstRefreshMutation, usePrincipalRefreshMutation, useStudRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [studRefresh, {
        isUninitialized:stuUninit,
        isLoading:stuloding,
        isSuccess:stuSuccess,
        isError:stuIsError,
        error:stuErr
    }] = useStudRefreshMutation();

    
    const [insRefresh, {
        isUninitialized:insUninit,
        isLoading:insloding,
        isSuccess:insSuccess,
        isError:insIsError,
        error:insErr
    }] = useInstRefreshMutation();

    const [priRefresh, {
        isUninitialized:priUninit,
        isLoading:priloding,
        isSuccess:priSuccess,
        isError:priIsError,
        error:priErr
    }] = usePrincipalRefreshMutation();

    const [admRefresh, {
        isUninitialized:admUninit,
        isLoading:admloding,
        isSuccess:admSuccess,
        isError:admIsError,
        error:admErr
    }] = useAdminRefreshMutation();
    let refresh;
    let isSuccess;
    let isError;
    let isLoading;
    let error;
    let isUninitialized;

    if(!stuIsError){
        refresh=studRefresh
        isSuccess=stuSuccess;
        isLoading=stuloding;
        isError=stuIsError;
        isUninitialized=stuUninit
        error=stuErr
    }else if(!insIsError){
        refresh=insRefresh
        isSuccess=insSuccess;
        isLoading=insloding;
        isError=insIsError;
        isUninitialized=insUninit
        error=insErr
    }else if(!priIsError){
        refresh=priRefresh
        isSuccess=priSuccess;
        isLoading=priloding;
        isError=priIsError;
        isUninitialized=priUninit
        error=priErr
    }else if(!admIsError){
        refresh=admRefresh
        isSuccess=admSuccess;
        isLoading=admloding;
        isError=admIsError;
        isUninitialized=admUninit
        error=admErr
    }

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) { //persist: yes, token: no
        console.log(error)
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) {
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}
export default PersistLogin