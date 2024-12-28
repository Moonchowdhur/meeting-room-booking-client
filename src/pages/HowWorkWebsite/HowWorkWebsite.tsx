import {
  FaDoorOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaDoorOpen className="text-4xl text-[#667766]" />,
    title: "Select a Room",
    description: "Choose the perfect room for your meeting or event.",
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-[#667766]" />,
    title: "Choose Date & Time",
    description: "Pick a convenient date and time for your booking.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-[#667766]" />,
    title: "Confirm Booking",
    description: "Review and confirm your booking details.",
  },
  {
    icon: <FaMoneyCheckAlt className="text-4xl text-[#667766]" />,
    title: "Done with Payment",
    description: "Complete the payment to finalize your booking.",
  },
];

const HowWorkWebsite = () => {
  return (
    <div className="md:px-4 w-full p-4   mt-40 md:mt-6 rounded-md">
      <h2 className="text-3xl mb-2  font-medium tracking-widest text-center">
        HOW IT WORKS
      </h2>
      {/* underline */}
      <div className="flex justify-center">
        <div className="w-20 text-center rounded-md  h-[5px] bg-[#809580]"></div>
      </div>
      <div className="grid px-8 grid-cols-1 md:grid-cols-4 gap-8 mt-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex border-[#667766] border  shadow shadow-[#8da08d] p-3 rounded-xl flex-col items-center"
          >
            <div className="mb-4 text-[#5a685a]">{step.icon}</div>
            <h3 className="text-xl font-semibold text-black">{step.title}</h3>
            <p className="text-center text-sm  text-gray-600 mt-2">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWorkWebsite;
