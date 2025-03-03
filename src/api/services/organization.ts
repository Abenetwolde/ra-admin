import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Organization {
  org_id: number;
  org_name: string;
  domain: string;
  created_at: string;
  updated_at: string;
}

export const organizationsApi = createApi({
  reducerPath: 'organizationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tlwkc1rr-3000.uks1.devtunnels.ms/api' }),
  tagTypes: ['Organization'],
  endpoints: (builder) => ({
    getOrganizations: builder.query<Organization[], void>({
      query: () => '/organizations',
      providesTags: ['Organization'],
    }),
    getOrganizationById: builder.query<Organization, number>({
      query: (id) => `/organizations/${id}`,
      providesTags: (result, error, id) => [{ type: 'Organization', id }],
    }),
    createOrganization: builder.mutation<Organization, Partial<Organization>>({
      query: (newOrg) => ({
        url: '/organizations',
        method: 'POST',
        body: newOrg,
      }),
      invalidatesTags: ['Organization'],
    }),
    updateOrganization: builder.mutation<Organization, Partial<Organization> & { id: number }>({
      query: ({ id, ...updatedOrg }) => ({
        url: `/organizations/${id}`,
        method: 'PUT',
        body: updatedOrg,
      }),
      invalidatesTags: ['Organization'],
    }),
    deleteOrganization: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/organizations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organization'],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationsApi;
