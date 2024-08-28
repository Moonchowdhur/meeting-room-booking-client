import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AOS from "aos";
import "aos/dist/aos.css";

const TermsOfService = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#49674a]  mt-40 md:mt-0  text-white py-16">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Terms of Service
        </h2>
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-8">
          <Card
            data-aos="fade-up"
            className="bg-[#c8d1c9] text-gray-900 shadow-lg"
          >
            <CardContent>
              <h3 className="text-xl font-semibold mt-2 mb-3">
                Use of Service
              </h3>
              <p className="text-base leading-relaxed text-justify">
                By accessing our services, you agree to comply with these Terms
                of Service. You must provide accurate information and maintain
                the confidentiality of your account details.
              </p>
            </CardContent>
          </Card>
          <Card
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-[#c8d1c9] text-gray-900 shadow-lg"
          >
            <CardContent>
              <h3 className="text-xl font-semibold mt-2 mb-3">
                Booking and Payment
              </h3>
              <p className="text-base leading-relaxed text-justify">
                When you book a meeting room, you agree to pay the applicable
                fees as displayed on the website. All payments are processed
                securely, and you are responsible for providing valid payment
                information.
              </p>
            </CardContent>
          </Card>
          <Card
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-[#c8d1c9] text-gray-900 shadow-lg"
          >
            <CardContent>
              <h3 className="text-xl font-semibold mt-2 mb-3">
                Limitation of Liability
              </h3>
              <p className="text-base leading-relaxed text-justify">
                We are not liable for any indirect, incidental, or consequential
                damages arising out of your use of the website or services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
