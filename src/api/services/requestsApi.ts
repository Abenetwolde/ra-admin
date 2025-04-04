import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface Request {
  request_id: number;
  user_id: number;
  form_id: number;
  form_data: Record<string, any>;
  csr: string | null;
  request_type: string;
  download_format: string;
  file_path: string | null;
  status: string;
  submission_date: string;
  approval_date: string | null;
}

interface CreateRequestPayload {
  user_id: number;
  form_id: number;
  form_data: Record<string, any>;
  request_type: string;
  download_format: string;
}

interface UpdateRequestPayload extends Partial<CreateRequestPayload> {
  request_id: number;
}

export const requestsApi = createApi({
  reducerPath: "requestsApi",
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
  tagTypes: ["Requests"],
  endpoints: (builder) => ({
    getRequests: builder.query<Request[], void>({
      query: () => "/requests",
      providesTags: ["Requests"],
    }),
    createRequest: builder.mutation<Request, CreateRequestPayload>({
      query: (newRequest) => ({
        url: "/requests",
        method: "POST",
        body: newRequest,
      }),
      invalidatesTags: ["Requests"],
    }),
    updateRequest: builder.mutation<Request, UpdateRequestPayload>({
      query: ({ request_id, ...updatedRequest }) => ({
        url: `/requests/${request_id}`,
        method: "PUT",
        body: updatedRequest,
      }),
      invalidatesTags: ["Requests"],
    }),
    deleteRequest: builder.mutation<void, number>({
      query: (request_id) => ({
        url: `/requests/${request_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests"],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = requestsApi;
