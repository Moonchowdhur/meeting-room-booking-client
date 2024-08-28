/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";

import { FaPlus, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllRoom = () => {
  const { data, isLoading } = useGetAllRoomsQuery(undefined, {
    pollingInterval: 1000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4A249D]"></div>
      </div>
    );
  }

  console.log(data?.data);

  // Filter and map the data
  const availableRooms = data?.data.filter((room: any) => !room.isDeleted);

  console.log(availableRooms);

  return (
    <div className="md:px-12 w-full p-4 mt-40 md:mt-12 rounded-md ">
      {/* title */}
      {availableRooms?.length > 0 && (
        <h2 className="text-3xl mb-2 font-medium tracking-widest text-center ">
          MEETING<span className="text-[#072047]"> RO</span>OMS
        </h2>
      )}
      {/* underline */}
      <div className="flex justify-center">
        <div className="w-20 text-center rounded-md  h-[5px] bg-[#809580]"></div>
      </div>
      {/* MEEING ROOM ALL */}
      {availableRooms?.length > 0 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5  justify-between items-center mt-16 rounded-lg">
          {/* card */}

          {availableRooms?.length > 0 &&
            availableRooms?.slice(0, 6)?.map((room: any) => {
              return (
                <div
                  key={room._id}
                  className=" bg-[#49674a]   border  rounded-lg"
                >
                  <div>
                    <img
                      src={room?.image[0]}
                      // src="https://i.pinimg.com/550x/eb/4d/bb/eb4dbb0f4398f5a5276291c65e58c7e8.jpg"
                      className="h-[350px] w-[500px] relative inset-0 bg-[#072047] opacity-70 "
                      alt=""
                    />
                  </div>

                  <div className="flex px-3  p-1  mt-4 items-center  justify-between text-white">
                    <h2 className="text-center font-medium text-white text-xl tracking-wider">
                      {room?.name}
                    </h2>
                    <div className="flex  items-center text-white mx-2 gap-1">
                      <FaRupeeSign className="text-white text-base" />
                      <h2 className="text-base font-normal">
                        {" "}
                        {room?.pricePerSlot}
                      </h2>
                    </div>
                  </div>

                  <div className="flex justify-between px-3  p-1  ">
                    <div>
                      <h2 className="flex  items-center gap-1 text-white font-normal text-left  text-base">
                        Room:
                        <span className="text-white">{room?.roomNo}</span>
                      </h2>
                    </div>
                    <div>
                      <h2 className="flex mx-2  items-center gap-1 text-white font-normal text-left  text-base">
                        Floor:
                        <span className="text-white font-medium">
                          {room?.floorNo}
                        </span>
                      </h2>
                    </div>
                  </div>
                  {/* animity */}
                  <div className="flex   max-h-16 text-base  overflow-auto scroll-smooth mr-10 justify-between px-3  p-1  ">
                    <ul className="mt-2 ">
                      {room?.amenities?.map((amenity: string[], index: any) => (
                        <li
                          key={index}
                          className="flex mr-4 items-center gap-1 text-white"
                        >
                          <FaPlus className="text-white text-xs" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* /capacity & details button */}
                  <div className="flex items-center justify-between mt-4 mb-2 px-3  p-1  ">
                    <div>
                      <h2 className="flex  items-center gap-1 text-white font-normal text-left  text-base">
                        Capacity:
                        <span className="text-white ">{room?.capacity}</span>
                      </h2>
                    </div>
                    <div>
                      <Link
                        to={`/room/${room?._id}`}
                        className="border opacity-80 text-white text-base px-3 py-1 rounded-lg"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* card end */}
        </div>
      ) : (
        <h2 className="text-3xl mb-2 font-medium text-center mt-16  ">
          No Product Found
        </h2>
      )}
      {availableRooms?.length > 6 && (
        <div className="mt-12 flex justify-center">
          <Link
            to="/rooms"
            className="bg-[#49674a]  text-white text-base hover:bg-[#557856] tracking-wide  py-2 px-4 rounded-lg"
          >
            See More
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllRoom;
