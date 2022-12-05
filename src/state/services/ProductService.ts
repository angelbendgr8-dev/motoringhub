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
      const token = getState().userAuth.token;
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
} = ProductApi;
