import {RootState} from './../store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const ProductApi = createApi({
  reducerPath: 'ProductApi',
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
    getProducts: builder.query({
      query: () => ({
        url: 'products/cars',
      }),
    }),
    getAllProducts: builder.mutation({
      query: credentials => ({
        url: `products/all/cars?page=${credentials.page}`,
        method: 'GET',
      }),
    }),
    searchProducts: builder.mutation({
      query: credentials => ({
        url: `products/search/cars?s=${credentials.s}&page=${credentials.page}`,
        method: 'GET',
      }),
    }),
    searchParts: builder.mutation({
      query: credentials => ({
        url: `products/search/parts?s=${credentials.s}&page=${credentials.page}`,
        method: 'GET',
      }),
    }),
    getAllParts: builder.mutation({
      query: credentials => ({
        url: `products/all/parts?page=${credentials.page}`,
        method: 'GET',
      }),
    }),
    getSpareParts: builder.query({
      query: () => ({
        url: 'products/parts',
      }),
    }),
    orderProduct: builder.mutation({
      query: credentials => ({
        url: 'order/parts',
        method: 'post',
        body: credentials,
      }),
    }),
    inspectCar: builder.mutation({
      query: credentials => ({
        url: 'book/inspection',
        method: 'post',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetSparePartsQuery,
  useOrderProductMutation,
  useInspectCarMutation,
  useGetAllProductsMutation,
  useGetAllPartsMutation,
  useSearchProductsMutation,
  useSearchPartsMutation,
} = ProductApi;
