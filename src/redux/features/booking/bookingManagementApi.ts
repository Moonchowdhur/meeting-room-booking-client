import { baseApi } from "../../api/baseApi";

export const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: () => {
        return {
          url: "slots/availability",
          method: "GET",
        };
      },
    }),
    addBookings: builder.mutation({
      query: (data) => {
        console.log("sending rooms==>", data);
        return {
          url: "bookings",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["booking"],
    }),

    getAllBookings: builder.query({
      query: () => {
        return {
          url: "bookings",
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    deleteBookings: builder.mutation({
      query: (data) => {
        console.log("sending bookings==>", data);
        return {
          url: `bookings/${data?.rId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["booking"],
    }),
    updateBookings: builder.mutation({
      query: (data) => {
        console.log("sending bookings==>", data);
        return {
          url: `bookings/${data?.bId}`,
          method: "PUT",
          body: data.data,
        };
      },
      invalidatesTags: ["booking"],
    }),
    myBookings: builder.query({
      query: () => {
        return {
          url: "my-bookings",
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useAddBookingsMutation,
  useGetAllBookingsQuery,
  useDeleteBookingsMutation,
  useUpdateBookingsMutation,
  useMyBookingsQuery,
} = bookingManagementApi;
