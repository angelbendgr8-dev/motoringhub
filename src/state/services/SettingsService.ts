import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const SettingApi = createApi({
  reducerPath: 'SettingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getUrl(),
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().userAuth.token;
      // headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    updateProfilePics: builder.mutation({
      query: credentials => ({
        url: '/users/update/picture',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateProfileInfo: builder.mutation({
      query: credentials => ({
        url: '/users/update/info',
        method: 'POST',
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: credentials => ({
        url: '/users/change/password',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateProfilePicsMutation,
  useUpdateProfileInfoMutation,
  useChangePasswordMutation,
} = SettingApi;
