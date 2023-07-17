import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const studentsAdapter = createEntityAdapter({});
const coursesAdapter = createEntityAdapter({});
const instructorsAdapter = createEntityAdapter({});
const principalsAdapter = createEntityAdapter({});

const studentInitialState = studentsAdapter.getInitialState();
const courseInitialState = studentsAdapter.getInitialState();
const instructorInitialState = instructorsAdapter.getInitialState();
const principalInitialState = principalsAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => "/student",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadedStudent = responseData.map((student) => {
                    student.id = student._id;
                    return student;
                });
                return studentsAdapter.setAll(studentInitialState, loadedStudent);
            },
            providesTags: (result, error, args) => {
                if (result?.ids) {
                    return [
                        { type: "Student", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Student", id })),
                    ];
                } else {
                    return [{ type: "Student", id: "LIST" }];
                }
            },
        }),
        getCourse: builder.query({
            query: () => "/course",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadedCourses = responseData.map((course) => {
                    course.id = course._id;
                    return course;
                });
                return coursesAdapter.setAll(courseInitialState, loadedCourses);
            },
            providesTags: (result, error, args) => {
                if (result?.ids) {
                    return [
                        { type: "Course", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Course", id })),
                    ];
                } else {
                    return [{ type: "Course", id: "LIST" }];
                }
            },
        }),

        getInstructor: builder.query({
            query: () => "/instructor",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadedInstructor = responseData.map((instructor) => {
                    instructor.id = instructor._id;
                    return instructor;
                });
                return instructorsAdapter.setAll(
                    instructorInitialState,
                    loadedInstructor
                );
            },
            providesTags: (result, error, args) => {
                if (result?.ids) {
                    return [
                        { type: "Instructor", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Instructor", id })),
                    ];
                } else {
                    return [{ type: "Instructor", id: "LIST" }];
                }
            },
        }),
        getPrincipals: builder.query({
            query: () => "/principal",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadedPrincipals = responseData.map((principal) => {
                    principal.id = principal._id;
                    return principal;
                });
                return principalsAdapter.setAll(
                    principalInitialState,
                    loadedPrincipals
                );
            },
            providesTags: (result, error, args) => {
                if (result?.ids) {
                    return [
                        { type: "Principal", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Principal", id })),
                    ];
                } else {
                    return [{ type: "Principal", id: "LIST" }];
                }
            },
        }),
        createStudent: builder.mutation({
            query: (initialStudentData) => ({
                url: "/student",
                method: "POST",
                body: {
                    ...initialStudentData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),

        createCourse: builder.mutation({
            query: (initialCourseData) => ({
                url: "/course",
                method: "POST",
                body: {
                    ...initialCourseData,
                },
            }),
            invalidatesTags: [{ type: "Course", id: "LIST" }],
        }),

        createInstructor: builder.mutation({
            query: (initialStudentData) => ({
                url: "/instructor",
                method: "POST",
                body: {
                    ...initialStudentData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        createPrincipal: builder.mutation({
            query: (initialStudentData) => ({
                url: "/principal",
                method: "POST",
                body: {
                    ...initialStudentData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        createAdmin: builder.mutation({
            query: (initialStudentData) => ({
                url: "/admin",
                method: "POST",
                body: {
                    ...initialStudentData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...initialStudentData }) => ({
                url: `/student`,
                method: 'PATCH',
                body: {
                    ...initialStudentData,
                },
            }),
            invalidatesTags: (result, error, args) => [
                { type: 'Student', id: args.id },
            ],
        }),

        updateCourse: builder.mutation({
            query: ({ id, ...initialCourseData }) => ({
                url: `/course`,
                method: "PATCH",
                body: {
                    ...initialCourseData,
                },
            }),
            invalidatesTags: (result, error, args) => [
                { type: "Course", id: args.id },
            ],
        }),


        updateInstructor: builder.mutation({
            query: ({ id, ...initialInstructorData }) => ({
                url: `/instructor`,
                method: 'PATCH',
                body: {
                    ...initialInstructorData,
                },
            }),
            invalidatesTags: (result, error, args) => [
                { type: 'Instructor', id: args.id },
            ],
        }),

        deleteStudent: builder.mutation({
            query: ({ id }) => ({
                url: `/student`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, args) => [
                { type: 'Student', id: args.id },
            ],
        }),
        deleteCourse: builder.mutation({
            query: ({ id }) => ({
                url: `/course`,
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (result, error, args) => [
                { type: "Course", id: args.id },
            ],
        }),

        deleteInstructor: builder.mutation({
            query: ({ id }) => ({
                url: `/instructor`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, args) => [
                { type: 'Instructor', id: args.id },
            ],
        }),

        deletePrincipal: builder.mutation({
            query: ({ id }) => ({
                url: `/principal`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, args) => [
                { type: 'Principal', id: args.id },
            ],
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useGetInstructorQuery,
    useGetPrincipalsQuery,
    useGetCourseQuery,
    useCreateInstructorMutation,
    useCreatePrincipalMutation,
    useCreateStudentMutation,
    useCreateCourseMutation,
    useCreateAdminMutation,
    useUpdateStudentMutation,
    useUpdateInstructorMutation,
    useUpdateCourseMutation,
    useDeleteStudentMutation,
    useDeleteInstructorMutation,
    useDeletePrincipalMutation,
    useDeleteCourseMutation,
} = usersApiSlice;

// Student selectors
export const selectStudentsResult = usersApiSlice.endpoints.getStudents.select();

const selectStudentsData = createSelector(
    selectStudentsResult,
    (studentResult) => studentResult.data
);

export const {
    selectAll: selectAllStudents,
    selectById: selectStudentById,
    selectIds: selectStudentIds,
} = studentsAdapter.getSelectors((state) =>
    selectStudentsData(state) ?? studentInitialState
);

// Instructor selectors
export const selectInstructorResult =
    usersApiSlice.endpoints.getInstructor.select();

const selectInstructorsData = createSelector(
    selectInstructorResult,
    (instructorResult) => instructorResult.data
);

export const {
    selectAll: selectAllInstructors,
    selectById: selectInstructorById,
    selectIds: selectInstructorIds,
} = instructorsAdapter.getSelectors((state) =>
    selectInstructorsData(state) ?? instructorInitialState
);

// Principal selectors
export const selectPrincipalResult =
    usersApiSlice.endpoints.getPrincipals.select();

const selectPrincipalsData = createSelector(
    selectPrincipalResult,
    (principalResult) => principalResult.data
);

export const {
    selectAll: selectAllPrincipals,
    selectById: selectPrincipalById,
    selectIds: selectPrincipalIds,
} = principalsAdapter.getSelectors((state) =>
    selectPrincipalsData(state) ?? principalInitialState
);

// Course selectors
export const selectCourseResult = usersApiSlice.endpoints.getCourse.select();

const selectCoursesData = createSelector(
    selectCourseResult,
    (courseResult) => courseResult.data
);

export const {
    selectAll: selectAllCourses,
    selectById: selectCourseById,
    selectIds: selectCourseIds,
} = coursesAdapter.getSelectors((state) =>
    selectCoursesData(state) ?? courseInitialState
);

