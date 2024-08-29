/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  useGetSingleSlotQuery,
  useUpdateSlotMutation,
} from "@/redux/features/admin/slotManagementApi";
import {
  useGetAllRoomsQuery,
  useGetSingleRoomQuery,
} from "@/redux/features/admin/roomManagementApi";
import { useState } from "react";

const slotValidationSchema = z.object({
  room: z.string().optional(),
  date: z
    .string()

    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
    .optional(),
  startTime: z
    .string()

    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Invalid time format",
    })
    .optional(),
  endTime: z
    .string()

    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Invalid time format",
    })
    .optional(),
});

const UpdateRoom = ({ slotId, isDialogOpen, setIsDialogOpen }: any) => {
  console.log(slotId, "roomId");

  const [updateSlot] = useUpdateSlotMutation();

  const [alertShown, setAlertShown] = useState(false); // State to control alert visibility

  const { data: RoomData, isLoading } = useGetAllRoomsQuery(undefined, {
    pollingInterval: 1000,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: zodResolver(slotValidationSchema),
  });

  const { data: slotData, error } = useGetSingleSlotQuery(slotId);

  const { data: singleRoom } = useGetSingleRoomQuery(slotData?.data?.room, {
    pollingInterval: 1000,
  });

  console.log(slotData, error);
  console.log(singleRoom);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }

  // Filter and map the data
  const availableRooms = RoomData?.data.filter((room: any) => !room.isDeleted);

  // console.log(availableRooms);

  if (slotData?.data?.isBooked && !alertShown) {
    // Show the alert only if it hasn't been shown before
    swal({
      title: "Update Failed",
      text: "You can't update this slot as it has already been booked.",
      icon: "error",
      //@ts-expect-error :'buttons' is generated error
      buttons: "Okay",
    }).then(() => {
      setAlertShown(false); // Reset the alert state after user acknowledges
    });

    // Set the alert as shown
    setAlertShown(true);

    // Exit the function to prevent further actions
    return;
  }

  // Function to handle form submission->
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form data:", data);
    // Reset form after submission
    reset();
    const toastId = toast.loading("updating slot...");

    // Safely create the updatedData object
    const updatedData = {
      data,
      // room: data?.room || slotData?.data?.room,
      sId: slotId,
    };
    // console.log(updatedData);
    try {
      const res = await updateSlot(updatedData).unwrap();
      console.log(res);

      if (res?.success) {
        toast.success(res?.message, { id: toastId });
      }
      if (res?.error) {
        toast.error(res?.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong.", { id: toastId });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>Update</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#557856]">Update Slot</DialogTitle>
          <DialogDescription className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
              <div>
                <label className="block text-gray-700 mb-2">Room</label>
                <select
                  {...register("room")}
                  defaultValue={singleRoom?.data?._id}
                  className="border input p-1 rounded-md w-full"
                >
                  <option value="" disabled selected>
                    Select a Room
                  </option>
                  {availableRooms?.map((room: any) => (
                    <option key={room._id} value={room._id}>
                      {`${room.name} - $${room.pricePerSlot}`}
                    </option>
                  ))}
                </select>
                {errors.room && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.room.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  {...register("date")}
                  defaultValue={slotData?.data?.date?.split("T")[0]}
                  className=" border p-1 py-2 rounded-md w-full"
                />
                {errors.date && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  {...register("startTime")}
                  defaultValue={slotData?.data?.startTime}
                  className="input border py-2 input-bordered p-1 rounded-md w-full"
                />
                {errors.startTime && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.startTime.message}</p>
                )}
              </div>
              <div>
                <label className="block  text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  {...register("endTime")}
                  defaultValue={slotData?.data?.endTime}
                  className="input border input-bordered py-2 p-1 rounded-md w-full"
                />
                {errors.endTime && (
                  // @ts-expect-error: Unreachable code error
                  <p className="text-red-500">{errors.endTime.message}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary text-lg px-6 py-3 bg-[#7AAC7B] text-[#072047] font-semibold rounded-md hover:bg-[#a2c5a3] "
                >
                  Update Slot
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoom;
