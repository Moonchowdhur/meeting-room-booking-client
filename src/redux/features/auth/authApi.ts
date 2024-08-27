import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (uderInfo) => {
        console.log("userInfo==>", uderInfo);
        return {
          url: "auth/login",
          method: "POST",
          body: uderInfo,
        };
      },
    }),
    register: builder.mutation({
      query: (uderInfo) => {
        console.log("userInfo==>", uderInfo);
        return {
          url: "auth/signup",
          method: "POST",
          body: uderInfo,
        };
      },
    }),
    getUserByEmail: builder.query({
      query: (email) => {
        console.log(email);
        return {
          url: `auth/${email}`,
          method: "GET",
        };
      },
      // transformResponse: (response) => {
      //   console.log("inside response", response);
      //   return {
      //     data: response.data,
      //   };
      // },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserByEmailQuery } =
  authApi;
