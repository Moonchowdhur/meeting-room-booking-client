const ChooseMeetingRoom = () => {
  const features = [
    {
      title: "Seamless Booking Experience",
      description: "Book your rooms with ease using our intuitive platform.",
      icon: "📅",
    },
    {
      title: "Secure Transactions",
      description: "All payments are encrypted and securely processed.",
      icon: "🔒",
    },
  
    {
      title: "Exclusive Discounts",
      description:
        "Enjoy special discounts and offers available only to our members.",
      icon: "💸",
    },
    {
      title: "High-Quality Rooms",
      description:
        "Stay in top-rated rooms equipped with all modern amenities.",
      icon: "🏨",
    },
    {
      title: "Instant Confirmation",
      description: "Receive booking confirmations instantly via email and SMS.",
      icon: "📧",
    },
    {
      title: "No Hidden Fees",
      description: "What you see is what you pay. No surprises at checkout.",
      icon: "📝", 
    },
  ];

  return (
    <section className="md:px-8  w-full p-4 mt-40 md:mt-12 rounded-md">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
          WHY CHOOSE US
        </h2>
        {/* underline */}
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md  h-[5px] bg-[#809580]"></div>
        </div>
        <div className="grid grid-cols-1  mt-16  sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseMeetingRoom;
