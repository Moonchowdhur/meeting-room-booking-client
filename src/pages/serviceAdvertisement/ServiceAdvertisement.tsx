import {
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ServiceAdvertisement = () => {
  const services = [
    {
      title: "Real-Time Availability",
      description:
        "Check the availability of rooms instantly and make your decision without delay.",
      icon: <FaClock className="text-blue-500" />,
    },
    {
      title: "Instant Booking",
      description:
        "Receive immediate confirmation of your bookings via email and SMS.",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    {
      title: "Flexible Scheduling",
      description:
        "Schedule your bookings according to your convenience with no hassle.",
      icon: <FaCalendarAlt className="text-purple-500" />,
    },
    {
      title: "24/7 Support",
      description:
        "Our support team is available round the clock to assist you.",
      icon: <FaPhoneAlt className="text-red-500" />,
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="md:px-4 w-full p-4 mt-40 md:mt-12 rounded-md">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
          OUR SERVICES
        </h2>
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md  h-[5px] bg-[#809580]"></div>
        </div>
        <div className="grid grid-cols-1  mt-16  sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center">
                <div className="text-4xl mb-4">{service.icon}</div>
              </div>
              <h3 className="text-xl text-[#49674a]  font-bold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAdvertisement;
