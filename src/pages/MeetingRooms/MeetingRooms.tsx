/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";
import { FaPlus, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import useDebounce from "@/redux/hooks/useDebounce";

const MeetingRooms = () => {
  const { data, isLoading } = useGetAllRoomsQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCapacityRange, setSelectedCapacityRange] =
    useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  const [sortOption, setSortOption] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1); //  added
  const roomsPerPage = 6; // added


  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  // Filter and map the data
  const availableRooms = data?.data.filter((room: any) => !room.isDeleted);

  console.log(availableRooms);

  const filteredRooms = useMemo(() => {
    let rooms = availableRooms || [];

    if (debouncedSearchQuery) {
      rooms = rooms.filter(
        (room: any) =>
          room.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          room.amenities.some(
            (amenity: string) =>
              amenity
                .toLowerCase()
                .includes(debouncedSearchQuery.toLowerCase()) ||
              room.pricePerSlot.toString().includes(debouncedSearchQuery) ||
              room.roomNo.toString().includes(debouncedSearchQuery)
          )
      );
    }

    if (selectedCapacityRange) {
      rooms = rooms.filter((room: any) => {
        const [min, max] = selectedCapacityRange.split("-").map(Number);
        return room.capacity >= min && room.capacity <= max;
      });
    }

    if (selectedPriceRange) {
      rooms = rooms.filter((room: any) => {
        const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
        return room.pricePerSlot >= minPrice && room.pricePerSlot <= maxPrice;
      });
    }

    if (sortOption === "priceLowToHigh") {
      rooms = [...rooms].sort(
        (a: any, b: any) => a.pricePerSlot - b.pricePerSlot
      );
    } else if (sortOption === "priceHighToLow") {
      rooms = [...rooms].sort(
        (a: any, b: any) => b.pricePerSlot - a.pricePerSlot
      );
    }

    return rooms;
  }, [
    availableRooms,
    debouncedSearchQuery,
    selectedPriceRange,
    selectedCapacityRange,
    sortOption,
  ]);


  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms?.length / roomsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4A249D]"></div>
      </div>
    );
  }

  return (
    <div className="md:px-12 w-full p-4 mt-40 md:mt-12 rounded-md ">
      {/* Search and Filter Section */}
      <div className="md:flex flex-col mt-4 md:mt-0 md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by room name or price"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md mb-2 md:mb-0"
        />

        <select
          value={selectedCapacityRange}
          onChange={(e) => setSelectedCapacityRange(e.target.value)}
          className="p-2 border rounded-md mb-2 md:mb-0"
        >
          <option value="">Select Capacity</option>
          <option value="10-50">10-50</option>
          <option value="60-90">60-90</option>
          <option value="100-500">100-500</option>
        </select>

        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="p-2 border rounded-md mb-2 md:mb-0"
        >
          <option value="">Select Price Range</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-900">₹500 - ₹900</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded-md mb-2 md:mb-0"
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>

        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedCapacityRange("");
            setSelectedPriceRange("");
            setSortOption("");
          }}
          className="p-2 border  rounded-md bg-[#49674a] text-white"
        >
          Clear Filters
        </button>
      </div>

      {/* Meeting Room Cards */}
      {currentRooms?.length > 0 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 justify-between items-center mt-16 rounded-lg">
          {currentRooms.map((room: any) => (
            <div key={room._id} className="bg-[#49674a] border rounded-lg">
              <div>
                <img
                  src={room?.image[0]}
                  className="h-[350px] w-[500px] relative inset-0 bg-[#072047] opacity-70"
                  alt=""
                />
              </div>

              <div className="flex px-3 p-1 mt-4 items-center justify-between text-white">
                <h2 className="text-center font-medium text-white text-xl tracking-wider">
                  {room?.name}
                </h2>
                <div className="flex items-center text-white mx-2 gap-1">
                  <FaRupeeSign className="text-white text-base" />
                  <h2 className="text-base font-normal">
                    {room?.pricePerSlot}
                  </h2>
                </div>
              </div>

              <div className="flex justify-between px-3 p-1">
                <div>
                  <h2 className="flex items-center gap-1 text-white font-normal text-left text-base">
                    Room: <span className="text-white">{room?.roomNo}</span>
                  </h2>
                </div>
                <div>
                  <h2 className="flex mx-2 items-center gap-1 text-white font-normal text-left text-base">
                    Floor:{" "}
                    <span className="text-white font-medium">
                      {room?.floorNo}
                    </span>
                  </h2>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex max-h-16 text-base overflow-auto scroll-smooth mr-10 justify-between px-3 p-1">
                <ul className="mt-2">
                  {room?.amenities?.map((amenity: string, index: number) => (
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

              {/* Capacity & Details Button */}
              <div className="flex items-center justify-between mt-4 mb-2 px-3 p-1">
                <div>
                  <h2 className="flex items-center gap-1 text-white font-normal text-left text-base">
                    Capacity:{" "}
                    <span className="text-white">{room?.capacity}</span>
                  </h2>
                </div>
                <div>
                  <Link
                    to={`/room/${room?._id}`}
                    className="border opacity-80 text-white text-base px-3 py-1 rounded-lg"
                  >
                    Details
                  </Link>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-3xl mb-2 font-medium text-center mt-16">
          No Room Found
        </h2>
      )}

      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-[#49674a] text-white"
                : "bg-white text-[#49674a] border border-[#49674a]"
            } border rounded-md`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MeetingRooms;
