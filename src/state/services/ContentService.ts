import {RootState} from './../store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const ContentApi = createApi({
  reducerPath: 'ContentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getUrl(),
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).userAuth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getServices: builder.query({
      query: () => ({
        url: 'content/services',
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: 'content/categories',
      }),
    }),
    getAllBrands: builder.mutation({
      query: () => ({
        url: 'content/car/all/brands',
        method: 'GET',
      }),
    }),
    getModels: builder.query({
      query: id => ({
        url: `content/brands/${id}`,
      }),
    }),
    getLocations: builder.query({
      query: () => ({
        url: 'content/locations',
      }),
    }),
    getCarBrands: builder.query({
      query: () => ({
        url: 'content/car/brands',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetServicesQuery,
  useGetCategoriesQuery,
  useGetLocationsQuery,
  useGetCarBrandsQuery,
  useGetModelsQuery,
  useGetAllBrandsMutation,
} = ContentApi;
