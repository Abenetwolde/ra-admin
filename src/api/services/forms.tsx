import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tlwkc1rr-3000.uks1.devtunnels.ms/api", // Your API URL
    prepareHeaders: (headers, { getState }) => {
      // Access the Redux state
      const state = getState() as RootState;
      const token = state.user.token; // Assuming your user state is under 'user' key

      // If token exists, add it to the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Form'],
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => '/forms',
      providesTags: ['Form'],
    }),
    getFormById: builder.query({
      query: (id) => `/forms/${id}`,
      providesTags: (result, error, id) => [{ type: 'Form', id }],
    }),
    createForm: builder.mutation({
      query: (newForm) => ({
        url: '/forms',
        method: 'POST',
        body: newForm,
      }),
      invalidatesTags: ['Form'],
    }),
    updateForm: builder.mutation({
      query: ({ id, ...updatedForm }) => ({
        url: `/forms/${id}`,
        method: 'PUT',
        body: updatedForm,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Form', id }],
    }),
    deleteForm: builder.mutation({
      query: (id) => ({
        url: `/forms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Form'],
    }),
  }),
});

export const {   useGetFormsQuery,
  useGetFormByIdQuery,
  useCreateFormMutation,
  useUpdateFormMutation,
  useDeleteFormMutation, } = formsApi;
