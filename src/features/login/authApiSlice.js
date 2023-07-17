import { apiSlice } from "../../app/api/apiSlice";
import { logOut,setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        studentLogin: builder.mutation({
            query: credentials => ({
                url: "auth/student",
                method: "POST",
                body: { ...credentials }
            })
        }),
        instructortLogin: builder.mutation({
            query: credentials => ({
                url: "/auth/instructor",
                method: "POST",
                body: { ...credentials }
            })
        }),
        adminLogin: builder.mutation({
            query: credentials => ({
                url: "/auth/admin",
                method: "POST",
                body: { ...credentials }
            })
        }),
        principaltLogin: builder.mutation({
            query: credentials => ({
                url: "/auth/principal",
                method: "POST",
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/student/logout",
                method: "POST"
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data);
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        studRefresh: builder.mutation({
            query: () => ({
                url: '/auth/student/refresh',
                method: 'GET'
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const {data}=await queryFulfilled
                    const {accessToken}=data
                    dispatch(setCredentials({accessToken}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        instRefresh: builder.mutation({
            query: () => ({
                url: '/auth/instructor/refresh',
                method: 'GET'
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                console.log(queryFulfilled);
                try {
                    const {data}=await queryFulfilled
                    const {accessToken}=data
                    dispatch(setCredentials({accessToken}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        principalRefresh: builder.mutation({
            query: () => ({
                url: '/auth/principal/refresh',
                method: 'GET'
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                console.log(queryFulfilled);
                try {
                    const {data}=await queryFulfilled
                    const {accessToken}=data
                    dispatch(setCredentials({accessToken}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        adminRefresh: builder.mutation({
            query: () => ({
                url: '/auth/admin/refresh',
                method: 'GET'
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                console.log(queryFulfilled);
                try {
                    const {data}=await queryFulfilled
                    const {accessToken}=data
                    dispatch(setCredentials({accessToken}))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const {
    useStudentLoginMutation,
    useInstructortLoginMutation,
    usePrincipaltLoginMutation,
    useAdminLoginMutation,
    useStudRefreshMutation,
    useSendLogoutMutation,
    useInstRefreshMutation,
    usePrincipalRefreshMutation,
    useAdminRefreshMutation
} = authApiSlice;