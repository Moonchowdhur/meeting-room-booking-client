import { baseApi } from "../../api/baseApi";

export const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => {
        return {
          url: "rooms",
          method: "GET",
        };
      },
      providesTags: ["room"],
    }),
    addRooms: builder.mutation({
      query: (data) => {
        console.log("sending rooms==>", data);
        return {
          url: "rooms",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["room"],
    }),
    updateRoom: builder.mutation({
      query: (data) => {
        console.log("sending rooms==>", data);
        return {
          url: `rooms/${data?.rId}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["room"],
    }),
    getSingleRoom: builder.query({
      query: (id) => {
        return {
          url: `rooms/${id}`,
          method: "GET",
        };
      },
      providesTags: ["room"],
    }),
    deleteRoom: builder.mutation({
      query: (data) => {
        console.log("sending rooms==>", data);
        return {
          url: `rooms/${data?.rId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useAddRoomsMutation,
  useGetSingleRoomQuery,
  useDeleteRoomMutation,
} = roomManagementApi;
