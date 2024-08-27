// Need to use the React-specific entry point to import createApi
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Define a service using a base URL and expected endpoints
// export const userApi = createApi({
//   reducerPath: "pokemonApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth/" }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query({
//       query: (email) => `/${email}`,
//     }),
//   }),
// });
