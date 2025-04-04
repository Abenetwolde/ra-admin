import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface User {
  user_id: number;
  org_id: number | null;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  address: string;
  country: string;
  state: string;
  telephone: string;
  created_at: string;
  updated_at: string;
}

interface CreateUserPayload {
  org_id?: number | null;
  username: string;
  email: string;
  password: string;
  role: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  address: string;
  country: string;
  state: string;
  telephone: string;
}

interface UpdateUserPayload extends Partial<CreateUserPayload> {
  user_id: number;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
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
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<User, CreateUserPayload>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, UpdateUserPayload>({
      query: ({ user_id, ...updatedUser }) => ({
        url: `/users/${user_id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (user_id) => ({
        url: `/users/${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
