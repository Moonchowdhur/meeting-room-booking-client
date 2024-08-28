/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetAllSlotsAvailabilityQuery } from "@/redux/features/admin/slotManagementApi";
import { authApi } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setBookingData,
  TBooking,
} from "@/redux/features/booking/bookingSlice";

const BookingProcess = () => {
  const { id: roomId } = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const user = useAppSelector((state) => state.auth.user);
  const { data: userData } = authApi.useGetUserByEmailQuery(user?.email);
  const { data: slotData, isLoading } = useGetAllSlotsAvailabilityQuery({
    date: selectedDate.toISOString().split("T")[0],
    roomId,
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  console.log(slotData);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  // Filter and map the data
  const availableSlots = slotData?.data.filter((room: any) => !room.isBooked);
  console.log(availableSlots);

  const handleSlotSelection = (slotId: any) => {
    setSelectedSlots((prevSlots: any) =>
      prevSlots.includes(slotId)
        ? prevSlots.filter((id: any) => id !== slotId)
        : [...prevSlots, slotId]
    );
  };

  console.log(selectedSlots);

  const handleBookingConfirmation = () => {
    const payload: TBooking = {
      date: selectedDate.toISOString().split("T")[0],
      slots: selectedSlots,
      room: roomId as string,
      user: userData?.data?._id,
    };

    console.log("Booking Payload:", payload);
    dispatch(setBookingData(payload));
    navigate("/checkout");
  };

  return (
    <div className="container mt-40 md:mt-0 mx-auto px-4 py-8">
      <h2 className="text-3xl mb-2 font-medium tracking-wider text-center">
        Booking Process for Room
      </h2>
      <div className="flex justify-center">
        <div className="w-20 text-center rounded-md h-[5px] bg-[#809580]"></div>
      </div>

      <div className="bg-white border mt-5 border-[#809580] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select Booking Date</h2>
        <DatePicker
          selected={selectedDate}
          //@ts-expect-error :'date' is possibly 'null'
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
          className="border p-2 rounded-lg"
        />

        <h2 className="text-xl font-semibold mt-6 mb-4">
          Available Time Slots
        </h2>
        {availableSlots && availableSlots?.length > 0 ? (
          <ul className="list-disc pl-5">
            {availableSlots?.map((slot: any) => (
              <li key={slot._id} className="mb-2">
                <input
                  type="checkbox"
                  id={slot._id}
                  //@ts-expect-error :'slot_id' is string
                  checked={selectedSlots.includes(slot._id)}
                  onChange={() => handleSlotSelection(slot._id)}
                />
                <label htmlFor={slot._id} className="ml-2">
                  {slot.startTime} - {slot.endTime}
                </label>
                {slot.isBooked ? (
                  <span className="text-red-500 ml-4">(Booked)</span>
                ) : (
                  <span className="text-green-500 ml-4">(Available)</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No available slots for this date.</p>
        )}

        <h2 className="text-xl font-semibold mt-6 mb-4">Your Information</h2>
        {userData ? (
          <div className="bg-[#dbe1db] p-4 rounded-lg">
            <p>
              <strong>Name:</strong> {userData.data.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.data.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.data.phone}
            </p>
            <p>
              <strong>Address:</strong> {userData.data.address}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">User information not available.</p>
        )}

        <div className="mt-6 gap-2 flex justify-between">
          <button
            onClick={handleBookingConfirmation}
            disabled={selectedSlots?.length === 0}
            className={`bg-[#557856] text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-[#455e45] transition ${
              selectedSlots?.length === 0
                ? "opacity-50 text-gray-500 cursor-not-allowed"
                : ""
            }`}
          >
            Checkout
          </button>
          <Link
            to={`/room/${roomId}`}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg text-base md:text-lg  font-semibold hover:bg-gray-400 transition"
          >
            Back to Room Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;
