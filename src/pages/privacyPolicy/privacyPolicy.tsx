import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AOS from "aos";
import "aos/dist/aos.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#49674a]  mt-40 md:mt-0  text-white py-16">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h2>
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
        </div>
        <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2">
          <Card
            data-aos="fade-up"
            className=" text-gray-900 bg-[#c8d1c9] shadow-lg"
          >
            <CardContent>
              <h3 className="text-xl font-semibold mt-2 mb-2">Your Privacy</h3>
              <p className="text-base leading-relaxed text-justify">
                We value your privacy and are committed to protecting your
                personal data. This Privacy Policy outlines the types of
                information we collect, how we use it, and the measures we take
                to safeguard your data.
              </p>
            </CardContent>
          </Card>
          <Card
            data-aos="fade-up"
            data-aos-delay="100"
            className=" text-gray-900 bg-[#c8d1c9] shadow-lg"
          >
            <CardContent>
              <h3 className="text-xl font-semibold mt-2 mb-2">
                Information We Collect
              </h3>
              <p className="text-base leading-relaxed text-justify">
                We collect personal information such as your name, email
                address, phone number, and payment details when you make a
                booking or register on our site. This information is used solely
                for the purpose of providing our services and enhancing your
                experience on our platform.
              </p>
            </CardContent>
          </Card>
          <Card
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-[#c8d1c9] text-gray-900 shadow-lg"
          >
            <CardContent>
              <h3 className="text-xl font-semibold mt-2 mb-2">Your Consent</h3>
              <p className="text-base leading-relaxed text-justify">
                By using our website, you consent to the collection and use of
                your personal information as outlined in this Privacy Policy. We
                may update this policy from time to time, and any changes will
                be posted on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
