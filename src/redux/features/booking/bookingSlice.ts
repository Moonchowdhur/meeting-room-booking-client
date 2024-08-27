import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TBooking = {
  date: string;
  slots: string[];
  room: string;
  user: string;
};

type TBookingState = {
  bookingData: null | TBooking;
};

const initialState: TBookingState = {
  bookingData: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<TBooking>) => {
      state.bookingData = action.payload;
    },
    clearBookingData: (state) => {
      state.bookingData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBookingData, clearBookingData } = bookingSlice.actions;

export default bookingSlice.reducer;
