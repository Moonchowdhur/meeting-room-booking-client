/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  useDeleteBookingsMutation,
  useGetAllBookingsQuery,
  useUpdateBookingsMutation,
} from "@/redux/features/booking/bookingManagementApi";
import swal from "sweetalert";
import { toast } from "sonner";
import { ImCheckboxChecked } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { MdAutoDelete } from "react-icons/md";

const AllBookingByTabular = () => {
  const itemsPerPage = 8;
  const { data: allBookings, isLoading } = useGetAllBookingsQuery(undefined, {
    pollingInterval: 1000,
  });

  const [deleteBooking] = useDeleteBookingsMutation();
  const [updateBooking] = useUpdateBookingsMutation();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  const handleApprove = async (bookingId: string) => {
    const data = {
      data: {
        isConfirmed: "confirmed",
      },
      bId: bookingId,
    };

    try {
      await updateBooking(data).unwrap();
      toast.success("Booking approved successfully");
    } catch (err) {
      toast.error("Failed to approve booking");
    }
  };

  const handleReject = async (bookingId: string) => {
    const data = {
      data: {
        isConfirmed: "unconfirmed",
      },
      bId: bookingId,
    };

    try {
      await updateBooking(data).unwrap();
      toast.success("Booking rejected successfully");
    } catch (err) {
      toast.error("Failed to reject booking");
    }
  };

  const handleDelete = (id: string) => {
    swal({
      title: "Are you sure to delete?",
      text: "Once deleted, you will not be able to recover this booking!",
      icon: "warning",
      //@ts-expect-error: no error found
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteBooking({ rId: id })
          .then((response) => {
            if (response?.data) {
              swal("Deleted!", "The booking has been deleted.", "success");
            } else {
              swal(
                "Error",
                "There was a problem deleting the booking.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            swal("Error", "There was a problem deleting the booking.", "error");
          });
      } else {
        swal("Cancelled", "The booking is safe!", "info");
      }
    });
  };

  // Pagination logic
  const totalBookings = allBookings?.data || [];
  const totalPages = Math.ceil(totalBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = totalBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border-2 border-[#557856]">
            <TableHead className="text-[#557856] font-medium text-base">
              Room Name
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              User Name
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Date & Time
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Status
            </TableHead>
            <TableHead className="text-[#557856] text-center font-medium text-base">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBookings.map((booking: any) => (
            <TableRow key={booking._id}>
              <TableCell className="py-1 h-1">{booking.room.name}</TableCell>
              <TableCell className="py-1 h-1">{booking.user.name}</TableCell>
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
              <TableCell className="flex py-6 h-1 justify-center gap-2 items-center mt-3">
                {booking.isConfirmed === "confirmed" ? (
                  <Button
                    //@ts-expect-error: no error found

                    variant="danger"
                    onClick={() => handleReject(booking._id)}
                  >
                    <TiDelete className="text-red-600 text-3xl" />
                  </Button>
                ) : (
                  <Button
                    //@ts-expect-error: no error found

                    variant="success"
                    onClick={() => handleApprove(booking._id)}
                  >
                    <ImCheckboxChecked className="text-green-600 text-lg" />
                  </Button>
                )}
                <button onClick={() => handleDelete(booking._id)}>
                  <MdAutoDelete className="text-orange-600 text-2xl" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-[#557856] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllBookingByTabular;
