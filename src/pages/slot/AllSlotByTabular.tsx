/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import swal from "sweetalert";
import UpdateSlot from "./UpdateSlot";
import CreateSlot from "./CreateSlot";
import { useGetAllSlotsQuery } from "@/redux/features/booking/bookingManagementApi";
import { useDeleteSlotMutation } from "@/redux/features/admin/slotManagementApi";

const AllSlotByTabular = () => {
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const { data, isLoading } = useGetAllSlotsQuery(undefined, {
    pollingInterval: 1000,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteSlot] = useDeleteSlotMutation();
  const [alertShown, setAlertShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8; // Number of slots per page
  const totalItems = data?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = data?.data?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleUpdate = (slotId: any) => {
    setSelectedSlotId(slotId);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setCreateDialogOpen(true);
  };

  const handleDelete = (id: string, booked: boolean) => {
    if (booked && !alertShown) {
      swal({
        title: "Delete Failed",
        text: "You can't delete this slot as it has already been booked.",
        icon: "error",
        //@ts-expect-error: no error found

        buttons: "Okay",
      }).then(() => {
        setAlertShown(false);
      });
      setAlertShown(true);
      return;
    }

    swal({
      title: "Are you sure to delete?",
      text: "Once deleted, you will not be able to recover this slot!",
      icon: "warning",
      //@ts-expect-error: no error found

      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteSlot({ rId: id })
          .then((response: any) => {
            if (response?.data) {
              swal("Deleted!", "The slot has been deleted.", "success");
            } else {
              swal("Error", "There was a problem deleting the slot.", "error");
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            swal("Error", "There was a problem deleting the slot.", "error");
          });
      } else {
        swal("Cancelled", "The slot is safe!", "info");
      }
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-start">
        <button
          type="submit"
          onClick={() => handleAdd()}
          className="btn btn-primary text-lg px-4 mt-4 py-2 bg-[#557856] text-white font-medium rounded-md hover:bg-[#a2c5a3]"
        >
          Add Slot
        </button>
      </div>
      <Table className="mt-6">
        <TableHeader>
          <TableRow className="border-2 border-[#557856]">
            <TableHead className="text-[#557856] font-medium text-base">
              Room Name
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Start Time
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              End Time
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Date
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Booked
            </TableHead>
            <TableHead className="text-[#557856] font-medium text-base">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData?.map((slot: any) => (
            <TableRow key={slot._id}>
              <TableCell>{slot?.room?.name}</TableCell>
              <TableCell>{slot?.startTime}</TableCell>
              <TableCell>{slot?.endTime}</TableCell>
              <TableCell>{new Date(slot?.date).toLocaleDateString()}</TableCell>
              <TableCell>{slot.isBooked ? "Yes" : "No"}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleUpdate(slot?._id)}
                  className="mr-2"
                >
                  <FaPenToSquare className="text-[#557856] text-xl" />
                </button>
                <button onClick={() => handleDelete(slot?._id, slot.isBooked)}>
                  <RiDeleteBack2Fill className="text-red-600 text-xl" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === i + 1
                ? "bg-[#557856] text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {isDialogOpen && (
        <UpdateSlot
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          slotId={selectedSlotId}
        />
      )}

      {createDialogOpen && (
        <CreateSlot
          isDialogOpen={createDialogOpen}
          setIsDialogOpen={setCreateDialogOpen}
        />
      )}
    </div>
  );
};

export default AllSlotByTabular;
