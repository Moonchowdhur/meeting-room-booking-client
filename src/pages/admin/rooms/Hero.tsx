import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const carouselItems = [
  {
    image:
      "https://workitspaces.com.au/wp-content/uploads/2022/02/meeting-room-02.jpeg",
    title: "Book Your Ideal Meeting Room with Ease.",
    description:
      "Efficient, hassle-free room booking for all your meeting needs.",
  },
  {
    image:
      "https://workitspaces.com.au/wp-content/uploads/2022/02/meeting-room-02.jpeg",
    title: "Book Your Ideal Meeting Room with Ease.",
    description:
      "Efficient, hassle-free room booking for all your meeting needs.",
  },
  {
    image:
      "https://workitspaces.com.au/wp-content/uploads/2022/02/meeting-room-02.jpeg",
    title: "Book Your Ideal Meeting Room with Ease.",
    description:
      "Efficient, hassle-free room booking for all your meeting needs.",
  },
];

const Hero = () => {
  return (
    <Carousel>
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <div
              className="relative md:px-12 mt-40 w-full p-4 md:mt-16 rounded-md min-h-[500px] flex items-center justify-center"
              style={{
                backgroundImage: `url('${item.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>
              <div className="relative z-10 text-center text-white">
                <h1 className="mb-5 text-3xl md:text-5xl font-bold">
                  {item.title}
                </h1>
                <p className="mb-5 text-xl ">{item.description}</p>
                <Link
                  to="/rooms"
                  className="bg-[#7AAC7B] mt-8 text-white text-base hover:bg-[#557856] font-medium py-3 px-5 tracking-wider rounded-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-[#7AAC7B] mt-12 md:mt-0 ml-16 text-white" />
      <CarouselNext className="bg-[#7AAC7B] md:mt-0 mt-12 mr-16 text-white" />
    </Carousel>
  );
};

export default Hero;
