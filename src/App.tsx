/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";
import Navbar from "./components/ui/Navbar";
import { useAppSelector } from "./redux/hooks";
import ScrollToTop from "./pages/scrollToTop/ScrollToTop";
import Footer from "./pages/footer/Footer";

function App() {
  const bookedData = useAppSelector((state) => state.booking);

  console.log(bookedData);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (bookedData?.bookingData) {
        console.log(bookedData);
        event.preventDefault();
        event.returnValue = ""; // Chrome requires returnValue to be set
        swal({
          title: "Are you sure?",
          text: "You booked your slot. Are you sure you want to leave?",
          icon: "warning",
          buttons: ["Cancel", "Reload"],
          dangerMode: true,
        }).then((willLeave) => {
          if (willLeave) {
            swal("Your slot is blank, please add!", {
              icon: "success",
            }).then(() => {
              window.removeEventListener("beforeunload", handleBeforeUnload);
              window.location.reload();
            });
          } else {
            swal("Your booking slots are safe!");
          }
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [bookedData]);

  return (
    <>
      <div className="">
        <div className="md:min-h-[calc(100vh-70px)]  ">
          <Navbar />
          <Outlet />
          <ScrollToTop />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
