import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const coursesAdapter = createEntityAdapter({});
const coursesInitialState = coursesAdapter.getInitialState();

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
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
        return coursesAdapter.setAll(coursesInitialState, loadedCourses);
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
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "/course",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
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
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `/course`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Course", id: args.id },
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApiSlice;

// Course selectors
export const selectCoursesResult = courseApiSlice.endpoints.getCourses.select();

const selectCoursesData = createSelector(
  selectCoursesResult,
  (courseResult) => courseResult.data
);

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCourseIds,
} = coursesAdapter.getSelectors((state) =>
  selectCoursesData(state) ?? coursesInitialState
);
