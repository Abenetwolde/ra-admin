import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the types for login request and response
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Create the API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ngfd1vm4-3000.uks1.devtunnels.ms/api/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation } = authApi;
