// src/services/ejbcaApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const ejbcaApi = createApi({
  reducerPath: 'ejbcaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ngfd1vm4-3000.uks1.devtunnels.ms/api", // Your API URL
    prepareHeaders: (headers, { getState }) => {
      // Access the Redux state
      const state = getState() as RootState;
      const token = state.user.token; // Assuming your user state is under 'user' key

      // If token exists, add it to the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
// Ensure headers maintain exact casing by setting them explicitly lowercase
headers.set = (name: string, value: string) => {
  headers.delete(name); // Remove any existing header with different casing
  return Headers.prototype.set.call(headers, name.toLowerCase(), value);
};
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCertificateProfiles: builder.query<string[], void>({
      query: () => '/ejbca/profiles/authorized',
    }),
    getProfileDetails: builder.query<any, string>({
      query: (profileName) => ({
        url: '/ejbca/profile',
        headers: {
          'endentity_profile_name':'e-invoice',
        }
      }),
    }),
   
    getDashboardStats: builder.query<any, string>({
      query: (interval) => ({
        url: '/statistics/dashboard',
        method: 'GET',
        headers: {
          span: interval,
        },
      }),
    }),

  }),
});

export const { useGetCertificateProfilesQuery,  useLazyGetProfileDetailsQuery,  useGetDashboardStatsQuery,  } = ejbcaApi;