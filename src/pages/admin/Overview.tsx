/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";
import {
  useGetAllBookingsQuery,
  useGetAllSlotsQuery,
} from "@/redux/features/booking/bookingManagementApi";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCalendarAlt, FaClipboardList, FaHome } from "react-icons/fa";

const Overview = () => {
  const { data: roomData, isLoading } = useGetAllRoomsQuery(undefined, {
    pollingInterval: 1000,
  });
  const { data: slotData } = useGetAllSlotsQuery(undefined, {
    pollingInterval: 1000,
  });
  const { data: allBookingsData } = useGetAllBookingsQuery(undefined, {
    pollingInterval: 1000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  const roomCount = roomData?.data.length || 0;
  const slotCount = slotData?.data.length || 0;
  const bookingCount = allBookingsData?.data.length || 0;

  const latestBookings = allBookingsData?.data.slice(0, 7) || [];

  const chartData = {
    labels: ["Rooms", "Slots", "Bookings"],
    datasets: [
      {
        label: "Counts",
        data: [roomCount, slotCount, bookingCount],
        backgroundColor: ["#557856", "#8EB697", "#557856"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/*count*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rooms */}
        <div className=" bg-[#8EB697] p-5 text-white rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-center">Total Rooms</h3>
          <div className="w-full mt-1 h-[1px] flex justify-center bg-white"></div>
          <div className="flex justify-center mt-4 gap-2 items-center">
            <FaHome className="text-2xl " />
            <p className="text-xl font-medium ">{roomCount}</p>
          </div>
        </div>

        {/* Slots */}
        <div className=" bg-[#8EB697] p-5 text-white rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-center">Total Slots</h3>
          <div className="w-full mt-1 h-[1px] flex justify-center bg-white"></div>
          <div className="flex justify-center mt-4 gap-2 items-center">
            <FaCalendarAlt className="text-2xl " />
            <p className="text-xl font-medium ">{slotCount}</p>
          </div>
        </div>

        {/* Bookings */}
        <div className=" bg-[#8EB697] p-5 text-white rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-center">Total Bookings</h3>
          <div className="w-full mt-1 h-[1px] flex justify-center bg-white"></div>
          <div className="flex justify-center mt-4 gap-2 items-center">
            <FaClipboardList className="text-2xl " />
            <p className="text-xl font-medium ">{bookingCount}</p>
          </div>
        </div>
      </div>
      {/* Graph */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
        <Bar data={chartData} />
      </div>

      {/* Latest Bookings Table */}
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Latest Bookings</h3>
        <Table className="mt-4">
          <TableHeader>
            <TableRow className="border-2 border-[#557856]">
              <TableHead className="text-[#557856] font-medium text-base">
                User Name
              </TableHead>
              <TableHead className="text-[#557856] font-medium text-base">
                Room Name
              </TableHead>
              <TableHead className="text-[#557856] font-medium text-base">
                Date
              </TableHead>
              <TableHead className="text-[#557856] font-medium text-base">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestBookings.map((booking: any) => (
              <TableRow
                key={booking._id}
                className="odd:bg-white even:bg-gray-50"
              >
                <TableCell className="py-2">
                  {booking?.user.name || "N/A"}
                </TableCell>
                <TableCell className="py-2">
                  {booking?.room.name || "N/A"}
                </TableCell>
                <TableCell className="py-1 h-1">
                  {new Date(booking.date).toLocaleDateString()}{" "}
                  {booking.slots.map((slot: any) => (
                    <div key={slot._id}>
                      {slot.startTime} - {slot.endTime}
                    </div>
                  ))}
                </TableCell>
                <TableCell
                  className={`font-medium py-1 h-1 ${
                    booking.isConfirmed === "confirmed"
                      ? "text-[#557856]"
                      : "text-red-600"
                  }`}
                >
                  {booking.isConfirmed}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Overview;
