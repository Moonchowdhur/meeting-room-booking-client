import AllRoom from "../admin/rooms/AllRoom";
import Hero from "../admin/rooms/Hero";
import ChooseMeetingRoom from "../chooseMeetingRoom/ChooseMeetingRoom";
import HowWorkWebsite from "../HowWorkWebsite/HowWorkWebsite";
import ServiceAdvertisement from "../serviceAdvertisement/ServiceAdvertisement";
import Testimonials from "../testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceAdvertisement />
      <AllRoom />
      <ChooseMeetingRoom />
      <HowWorkWebsite />
      <Testimonials />
    </div>
  );
};

export default Home;
