import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const assignmentsAdapter = createEntityAdapter({});
const assignmentsInitialState = assignmentsAdapter.getInitialState();

export const assignmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignment",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedAssignments = responseData.map((assignment) => {
          assignment.id = assignment._id;
          return assignment;
        });
        return assignmentsAdapter.setAll(
          assignmentsInitialState,
          loadedAssignments
        );
      },
      providesTags: (result, error, args) => {
        if (result?.ids) {
          return [
            { type: "Assignment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Assignment", id })),
          ];
        } else {
          return [{ type: "Assignment", id: "LIST" }];
        }
      },
    }),
    createAssignment: builder.mutation({
      query: (formData) => ({
        url: "/assignment",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Assignment", id: "LIST" }],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, ...initialAssignmentData }) => ({
        url: `/assignment`,
        method: "PATCH",
        body: {
          ...initialAssignmentData,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Assignment", id: args.id },
      ],
    }),
    deleteAssignment: builder.mutation({
      query: ({ id }) => ({
        url: `/assignment`,
        method: "DELETE",
        body:{id}
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Assignment", id: args.id },
      ],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApiSlice;

// Assignment selectors
export const selectAssignmentsResult =
  assignmentsApiSlice.endpoints.getAssignments.select();

const selectAssignmentsData = createSelector(
  selectAssignmentsResult,
  (assignmentResult) => assignmentResult.data
);

export const {
  selectAll: selectAllAssignments,
  selectById: selectAssignmentById,
  selectIds: selectAssignmentIds,
} = assignmentsAdapter.getSelectors((state) =>
  selectAssignmentsData(state) ?? assignmentsInitialState
);
