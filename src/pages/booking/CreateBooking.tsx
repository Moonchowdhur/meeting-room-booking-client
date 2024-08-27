// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import z from "zod";
// import {
//   useAddBookingsMutation,
//   useGetAllSlotsQuery,
// } from "@/redux/features/booking/bookingManagementApi";
// import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";
// import { useAppSelector } from "@/redux/hooks";
// import { useEffect, useState } from "react";

// const bookingValidationSchema = z.object({
//   room: z.string().min(1, { message: "Room ID is required" }),
//   // user: z.string(),
//   date: z
//     .string()
//     .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
//   slots: z.string().min(1, { message: "Slot ID is required" }),
//   // slots: z.array(z.string()),
//   // slots: z.string(),
// });
// const CreateBooking = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(bookingValidationSchema),
//   });

//   const { data: slot } = useGetAllSlotsQuery(undefined);
//   const { data: rooms, isLoading } = useGetAllRoomsQuery(undefined);
//   const user = useAppSelector((state) => state.auth.user);
//   const [addBooking] = useAddBookingsMutation();

//   console.log(slot);

//   //! slot remove add(start)
//   const [selectedSlots, setSelectedSlots] = useState([]);

//   const handleSelectChange = (event) => {
//     const selectedOptions = Array.from(
//       event.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedSlots(selectedOptions);
//   };

//   const removeSlot = (slotId) => {
//     setSelectedSlots(selectedSlots.filter((slot) => slot !== slotId));
//   };

//   //! slot remove add(end)

//   //! remove when it comes from redux apoi
//   const [userr, setUserr] = useState(null);

//   // console.log(userr, user, slot?.data);

//   //! usereffetct tule then, redux dye fetch korte hbe, prblem hchhe server api te
//   useEffect(() => {
//     fetch(`http://localhost:5000/api/auth/${user?.email}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserr(data);
//       });
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4A249D]"></div>
//       </div>
//     );
//   }

//   // console.log(data?.data);

//   const onSubmit = async (data) => {
//     console.log(data);

//     const selectedSlotIds = data.slots;

//     if (selectedSlotIds.length === 0) {
//       console.error("No slots selected");
//       return;
//     }

//     // Find all selected slot objects
//     const selectedSlots = slot?.data.filter((slot) =>
//       selectedSlotIds.includes(slot._id)
//     );

//     if (selectedSlots.length === 0) {
//       console.error("Selected slots not found");
//       return;
//     }

//     // Extract the room ID and date from the first slot, and check consistency
//     const {
//       room: { _id: roomId },
//       date,
//     } = selectedSlots[0];

//     const allSameRoomAndDate = selectedSlots.every(
//       ({ room: { _id }, date: slotDate }) => _id === roomId && slotDate === date
//     );

//     if (!allSameRoomAndDate) {
//       console.error("Selected slots must be from the same room and date");
//       return;
//     }

//     // Prepare the data object for submission
//     const dataa = {
//       room: roomId,
//       date: date,
//       slots: selectedSlotIds, // Array of selected slot IDs
//     };

//     // try {
//     //   const user = userr?.data?._id;
//     //   const bookingData = { ...data, user, slots: data.slots };
//     //   console.log("Booking data to send:", bookingData);

//     //   const response = await addBooking(bookingData).unwrap();
//     //   console.log("Booking created:", response);
//     //   // Handle successful booking creation, e.g., show a success message, redirect, etc.
//     // } catch (error) {
//     //   console.error("Failed to create booking:", error);

//     // }
//   };

//   return (
//     <div className="p-4 rounded-md  max-w-lg mx-auto md:px-12 w-full mt-36 md:mt-5">
//       <h2 className="text-2xl font-semibold mb-6 text-center ">
//         Create Booking
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div>
//           <label className="block text-gray-700 mb-2">Room</label>
//           <select
//             {...register("room", { required: "Please select a room" })}
//             className="border input p-1 rounded-md w-full"
//           >
//             <option value="" disabled>
//               Select a room
//             </option>
//             {rooms?.data?.map((room) => (
//               <option key={room._id} value={room._id}>
//                 {room.name}
//               </option>
//             ))}
//           </select>
//           {errors.room && <p className="text-red-500">{errors.room.message}</p>}
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Date</label>
//           <input
//             type="date"
//             {...register("date")}
//             className=" border p-1 py-2 rounded-md w-full"
//           />
//           {errors.date && <p className="text-red-500">{errors.date.message}</p>}
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-2">Slot</label>
//           <select
//             {...register("slots", {
//               required: "Please select at least one slot",
//             })}
//             multiple
//             className="input border py-2 input-bordered p-1 rounded-md w-full"
//           >
//             <option value="" disabled>
//               Select a slot
//             </option>
//             {slot?.data.map((slot) => (
//               <option key={slot._id} value={slot._id}>
//                 {`${slot.room.name} - ${new Date(
//                   slot.date
//                 ).toLocaleDateString()} - ${slot.startTime} - ${slot.endTime}`}
//               </option>
//             ))}
//           </select>
//           {errors.slots && (
//             <p className="text-red-500">{errors.slots.message}</p>
//           )}
//         </div>

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="btn btn-primary text-lg px-6 py-3 bg-[#7AAC7B] text-[#072047] font-semibold rounded-md hover:bg-[#a2c5a3] "
//           >
//             Create Booking
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateBooking;

// {
//   /* <div>
// <label className="block text-gray-700 mb-2">Slot</label>
// <select
//   multiple
//   onChange={handleSelectChange}
//   className="input border py-2 input-bordered p-1 rounded-md w-full"
// >
//   <option value="" disabled>
//     Select slots
//   </option>
//   {slot?.data.map((slot) => (
//     <option key={slot._id} value={slot._id}>
//       {`${slot.room.name} - ${new Date(
//         slot.date
//       ).toLocaleDateString()} - ${slot.startTime} - ${slot.endTime}`}
//     </option>
//   ))}
// </select>

// <div className="mt-4">
//   {selectedSlots.map((slotId) => {
//     const selectedSlot = slot.data.find((s) => s._id === slotId);
//     return (
//       <div
//         key={slotId}
//         className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
//       >
//         <span>{`${selectedSlot.room.name} - ${new Date(
//           selectedSlot.date
//         ).toLocaleDateString()} - ${selectedSlot.startTime} - ${
//           selectedSlot.endTime
//         }`}</span>
//         <button
//           onClick={() => removeSlot(slotId)}
//           className="text-red-500 hover:text-red-700"
//         >
//           &times;
//         </button>
//       </div>
//     );
//   })}
// </div>
// </div>  */
// }

const CreateBooking = () => {
  return (
    <div>
      <h2>CreateBooking</h2>
    </div>
  );
};

export default CreateBooking;
