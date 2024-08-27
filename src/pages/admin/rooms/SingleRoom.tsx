import { useGetSingleRoomQuery } from "@/redux/features/admin/roomManagementApi";
import { useParams, Link } from "react-router-dom";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const SingleRoom = () => {
  const { id } = useParams();

  const { data: singleRoom, isLoading } = useGetSingleRoomQuery(id, {
    pollingInterval: 1000,
  });

  // const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState(
    singleRoom?.data?.image[0]
  );

  console.log(selectedImage, singleRoom?.data?.image[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    console.log("object");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#557856]"></div>
      </div>
    );
  }
  if (!singleRoom) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Room not found</p>
      </div>
    );
  }

  console.log(singleRoom);

  const { name, roomNo, floorNo, capacity, pricePerSlot, amenities, image } =
    singleRoom.data;

  // const handlePrev = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? image.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  // const handleNext = () => {
  //   const isLastSlide = currentIndex === image.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // };

  return (
    <div className="bg-[#49674a] mt-40 md:mt-0 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl border border-[#c8d1c9] p-1 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative ">
            {/* <img
              src={image}
              alt={name}
              className="w-full h-[350px] object-cover"
            /> */}

            {/* <Carousel>
              <CarouselContent>
                {image?.map((item, index) => (
                  <CarouselItem key={index}>
                    <div
                      className="relative md:px-12 w-full p-4 rounded-md min-h-[500px] flex items-center justify-center"
                      style={{
                        backgroundImage: `url('${item}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-[#7AAC7B] ml-16 text-white" />
              <CarouselNext className="bg-[#7AAC7B] mr-16 text-white" />
            </Carousel> */}

            {/* <div className="relative ">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform ease-out duration-300"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {image?.map((image, index) => (
                    <div
                      key={index}
                      className="min-w-full flex justify-center p-4"
                    >
                      <div
                        className="relative md:px-12 w-full p-4 rounded-md min-h-[400px] flex items-center justify-center"
                        style={{
                          backgroundImage: `url('${image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

             
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 transform  text-xl font-bold  -translate-y-1/2 bg-[#d9dfd9] text-black rounded-full px-5 py-3"
              >
                &#8592;
              </button>

            
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 transform text-xl font-bold -translate-y-1/2 bg-[#d9dfd9] text-black rounded-full px-5 py-3"
              >
                &#8594;
              </button>
            </div> */}

            <div className="flex flex-col md:flex-row items-start ">
              {/* Main Image */}
              <div className="flex-grow p-2">
                <div
                  className="relative w-full p-4 rounded-md min-h-[400px] flex items-center justify-center bg-[#ddd]"
                  style={{
                    backgroundImage: `url('${singleRoom?.data?.image[0]}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex md:flex-col  gap-4 mt-4 md:mt-2 md:ml-2">
                {singleRoom?.data?.image.map((image, index) => (
                  <button
                    key={index}
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  >
                    <div
                      className="w-full h-full rounded-md"
                      style={{
                        backgroundImage: `url('${image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black to-transparent text-white">
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="flex justify-between mt-2">
                <div className="flex items-center text-white">
                  <FaRupeeSign className="text-white text-base" />
                  <h2 className="text-base font-normal">{pricePerSlot}</h2>
                </div>
                <div className="flex items-center text-white">
                  <h2 className="text-base font-normal">Room No: {roomNo}</h2>
                  <h2 className="text-base font-normal ml-4">
                    Floor No: {floorNo}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <p className="text-lg font-semibold">Description:</p>
              <p className="text-gray-700 mb-4">
                This spacious room is ideal for meetings, conferences, and
                workshops. With modern amenities and comfortable seating, it is
                designed to provide a productive environment. Enjoy high-speed
                internet, a projector, and a whiteboard for your needs.
              </p>
              <p className="text-lg font-semibold">Special Offer:</p>
              <p className="bg-[#c8d1c9] mt-3  text-green-800 p-4 rounded-lg">
                Book now and get 20% off your first booking! Use code{" "}
                <strong className="text-green-900">BOOK20</strong> at checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-lg font-semibold">
                  Capacity: <span className="text-gray-700">{capacity}</span>
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Amenities:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {amenities.map((amenity: string[], index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaPlus className="text-gray-700 text-xs" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Link
                to={`/book/${id}`}
                className="bg-[#557856] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#455e45] transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
