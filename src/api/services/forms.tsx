import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://tlwkc1rr-3000.uks1.devtunnels.ms/api" }), // Change to your actual API URL
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
