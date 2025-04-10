import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// Adjust the import path to your store file

export const raofficerApi = createApi({
  reducerPath: "raofficerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.20.83.24:3000/api", // Your API base URL
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["raOfficer"],
  endpoints: (builder) => ({
    getRAOfficers: builder.query<any[], void>({
      query: () => "/users/org", // Adjust the endpoint as needed
      providesTags: ["raOfficer"],
    }),
    createRAOfficer: builder.mutation({
      query: (formData) => ({
        url: "/users/org",
        method: "POST",
        body: formData,
        // Since the API expects form-data, RTK Query will handle it automatically
      }),
      invalidatesTags: ["raOfficer"],
    }),
  }),
});

export const {useGetRAOfficersQuery, useCreateRAOfficerMutation } = raofficerApi;