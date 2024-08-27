import { baseApi } from "../../api/baseApi";

export const slotManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addslot: builder.mutation({
      query: (data) => {
        console.log("sending rooms==>", data);
        return {
          url: "slots",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["slots"],
    }),
    getAllSlotsAvailability: builder.query({
      query: ({ date, roomId }) => {
        return {
          url: `slots/availability`,
          method: "GET",
          params: {
            date,
            roomId,
          },
        };
      },

      providesTags: ["slots"],
    }),

    getAllSlotFromDb: builder.query({
      query: () => {
        return {
          url: "slots",
          method: "GET",
        };
      },
      providesTags: ["slots"],
    }),

    updateSlot: builder.mutation({
      query: (data) => {
        console.log("sending rooms==>", data);
        return {
          url: `slots/${data?.sId}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["slots"],
    }),
    getSingleSlot: builder.query({
      query: (id) => {
        return {
          url: `slots/${id}`,
          method: "GET",
        };
      },
      providesTags: ["slots"],
    }),
    deleteSlot: builder.mutation({
      query: (data) => {
        return {
          url: `slots/${data?.rId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useAddslotMutation,
  useGetAllSlotsAvailabilityQuery,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
  useGetSingleSlotQuery,
  useGetAllSlotFromDbQuery
} = slotManagementApi;
