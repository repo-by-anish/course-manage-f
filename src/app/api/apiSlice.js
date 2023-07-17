import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/login/authSlice";




const baseQuery = fetchBaseQuery({
    baseUrl: "https://crs-manage.cyclic.app",
    credentials: "include",
    "Access-Control-Allow-Credentials": "true",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})


const baseQueryWithReauth = async (args, api, extraOptions) => {


    let result = await baseQuery(args, api, extraOptions);
        console.log(result);
    if (result?.error?.status === 403||result?.error?.status === 401) {
        console.log("Sending refresh token");
        
        let refreshResult = await baseQuery("/auth/student/refresh", api, extraOptions)
        if(refreshResult?.error?.status===401){
            refreshResult=await baseQuery("/auth/instructor/refresh", api, extraOptions)
        }
        if(refreshResult?.error?.status===401){
            refreshResult=await baseQuery("/auth/principal/refresh", api, extraOptions)
        }
        if(refreshResult?.error?.status===401){
            refreshResult=await baseQuery("/auth/admin/refresh", api, extraOptions)
        }
        console.log(refreshResult);
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login expired. "
            }
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    tagTypes: ["Student","Instructor","Assignment","Course", "Principal","Admin"],
    endpoints: builder => ({})
})