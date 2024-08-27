import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://mongoose-master-assignment-jet.vercel.app/api",
  // baseUrl: "http://localhost:5000/api",

  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      //!Bearer jodi set kora hy
      headers.set("Authorization", `Bearer ${token}`);
      // headers.set("Authorization", `${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["room", "booking", "slots"],

  endpoints: () => ({}),
});

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://mongoose-master-assignment-jet.vercel.app/api",
//   }),
//   endpoints: () => ({}),
// });
