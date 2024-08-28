import { useState } from "react";

const testimonials = [
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "John Doe",
    role: "Software Engineer",
    review:
      "The meeting room was spacious and well-equipped. It made our team meeting productive.",
  },
  {
    image: "https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg",
    name: "Jane Smith",
    role: "Product Manager",
    review:
      "Excellent facilities and very professional staff. Highly recommend!",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "Alice Johnson",
    role: "Graphic Designer",
    review:
      "Great atmosphere and amenities. The meeting room exceeded our expectations.",
  },
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "Robert Brown",
    role: "IT Specialist",
    review:
      "The room was perfect for our needs. Very satisfied with the service.",
  },
  {
    image: "https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg",
    name: "Emily White",
    role: "Data Analyst",
    review:
      "Comfortable and quiet environment. It was ideal for our meeting and discussions.",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "Michael Green",
    role: "Web Developer",
    review:
      "Top-notch meeting room service. Everything was set up perfectly for our meeting.",
  },
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "Sarah Wilson",
    role: "Project Coordinator",
    review:
      "The meeting room was clean, organized, and ready on time. Excellent experience.",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "David Johnson",
    role: "Network Engineer",
    review:
      "Convenient location and professional service. Will definitely use again for future meetings!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === testimonials?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="md:px-12 w-full p-4 mt-16 rounded-md">
      <div className="container mx-auto">
        <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
          CUSTOMER TESTIMONIALS
        </h2>
        {/* underline */}
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md  h-[5px] bg-[#809580]"></div>
        </div>

        <div className="relative mt-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform ease-out duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials?.map((testimonial, index) => (
                <div key={index} className="min-w-full flex justify-center p-4">
                  <div className="bg-[#809580] rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <p className="text-xl text-white font-medium mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-sm  text-white mb-3">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-200 text-center mb-4">
                      {testimonial.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#809580] text-white rounded-full px-5 py-3"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#809580] text-white rounded-full px-5 py-3"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
