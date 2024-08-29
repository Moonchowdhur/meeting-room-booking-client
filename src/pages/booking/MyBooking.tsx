/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMyBookingsQuery } from "@/redux/features/booking/bookingManagementApi";

const MyBooking = () => {
  const { data, isLoading } = useMyBookingsQuery(undefined, {
    pollingInterval: 1000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-40 md:mt-0 py-10">
      {data?.data?.length > 0 ? (
        <>
          {" "}
          <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
            Bookings
          </h2>
          <div className="flex justify-center">
            <div className="w-20 text-center rounded-md  h-[5px] bg-[#809580]"></div>
          </div>
          <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data.map((booking: any) => (
              <div
                key={booking._id}
                className="bg-white border p-4 border-[#49674a]   rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={booking.room.image[0]}
                  alt={booking.room.name}
                  className="w-full rounded-xl h-48 object-cover relative inset-0 bg-[#072047] opacity-70"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {booking.room.name}
                  </h3>
                  <p className="text-gray-600">
                    Room No: {booking.room.roomNo}
                  </p>
                  <p className="text-gray-600">
                    Floor No: {booking.room.floorNo}
                  </p>
                  <p className="text-gray-600">
                    Capacity: {booking.room.capacity} people
                  </p>
                  <p className="text-gray-600">
                    Amenities: {booking.room.amenities.join(", ")}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Date: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Time:{" "}
                    {booking.slots
                      .map((slot: any) => `${slot.startTime} - ${slot.endTime}`)
                      .join(", ")}
                  </p>
                  <p
                    className={`mt-4 text-lg font-bold ${
                      booking.isConfirmed === "confirmed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {booking.isConfirmed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-3xl mt-5 mb-2 font-medium tracking-wider text-center">
          There is no booking history
        </h2>
      )}
    </div>
  );
};

export default MyBooking;
