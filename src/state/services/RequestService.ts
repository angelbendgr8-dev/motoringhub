import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const RequestApi = createApi({
  reducerPath: 'RequestApi',
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
    createService: builder.mutation({
      query: credentials => ({
        url: 'service/create',
        method: 'POST',
        body: credentials,
      }),
    }),
    addProduct: builder.mutation({
      query: credentials => ({
        url: 'users/add/product',
        method: 'POST',
        body: credentials,
      }),
    }),
    addOtherProduct: builder.mutation({
      query: credentials => ({
        url: 'users/add/other/product',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateServiceMutation,
  useAddProductMutation,
  useAddOtherProductMutation,
} = RequestApi;
