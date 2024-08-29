import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoCall } from "react-icons/io5";

import { MdEmail } from "react-icons/md";
import swal from "sweetalert";

const handleMessage = () => {
  swal(
    "Thank you for reaching us",
    "We will definitely reply your message",
    "success"
  );
};

const ContactUs = () => {
  return (
    <div className="md:px-12 w-full p-4 mt-36 md:mt-12  rounded-md ">
      <div className="md:flex items-start gap-8  ">
        <div className="md:w-1/2 w-full rounded-lg   p-4">
          <div className=" w-full ">
            <h2 className="text-4xl tracking-widest mb-1 font-bold w-10/12 mx-auto text-center ">
              Visit Our Office
            </h2>
            <div className="flex justify-center">
              <div className="w-20 text-center mt-5  rounded-md  h-[5px] bg-[#809580]"></div>
            </div>
            <h2 className=" tracking-widest mt-7 mb-7  w-8/12 mx-auto">
              73 Canal Street, Sibitra Pally, Shymbazar Road, Dharmatala,
              Kolkata-700030
            </h2>
            <img
              src="https://i.ibb.co/pKzZp5w/expand-idealmeetingroom-still-life-01.jpg"
              className="rounded-lg md:w-[700px] md:h-[540px]"
              alt=""
            />
          </div>
        </div>
        <div className="md:w-1/2  w-full rounded-lg   p-4">
          <div className=" w-full ">
            <h2 className="text-4xl tracking-widest mb-1 font-bold w-10/12 ">
              Leave Us a Message
            </h2>
         
            <h2 className=" md:tracking-widest mb-7 mt-7  md:w-8/12 ">
              We value your feedback and inquiries. If you have any questions,
              concerns, or just want to share your thoughts, please leave us a
              message. Our team will get back to you as soon as possible. Your
              input helps us improve and serve you better.
            </h2>
            <form>
              <div className="mt-5">
                <h2>Name*</h2>
                <div className="flex justify-center">
                  <input
                    name="name"
                    className="w-full rounded-lg border border-slate-300 mt-2 p-2 transition-transform duration-300 ease-in-out focus:scale-105 focus:shadow-lg"
                  />
                </div>
              </div>
              <div className="mt-2">
                <h2>Email*</h2>
                <div className="flex justify-center">
                  <input
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-300 mt-2 p-2 transition-transform duration-300 ease-in-out focus:scale-105 focus:shadow-lg"
                  />
                </div>
              </div>
              <div className="mt-2">
                <h2>Phone Number*</h2>
                <div className="flex justify-center">
                  <input
                    name="number"
                    className="w-full rounded-lg border border-slate-300 mt-2 p-2 transition-transform duration-300 ease-in-out focus:scale-105 focus:shadow-lg"
                  />
                </div>
              </div>
              <div className="mt-5">
                <h2>Subject*</h2>
                <div className="flex justify-center">
                  <input
                    name="subject"
                    className="w-full rounded-lg border border-slate-300 mt-2 p-2 transition-transform duration-300 ease-in-out focus:scale-105 focus:shadow-lg"
                  />
                </div>
              </div>
              <div className="mt-8">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 ease-in-out focus:scale-105 focus:shadow-lg"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                onClick={handleMessage}
                className="text-white text-lg mt-6 mx-auto px-5 py-2 rounded-lg bg-[#809580] hover:bg-[#5a685a] transition duration-300 ease-in-out hover:animate-pulse"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="md:grid-cols-4 grid-cols-1 grid  mx-3 items-center mt-10 gap-5">
        {/* cart */}
        <div className="text-center rounded-md p-3  ">
          <div className="flex bg-[#809580] animate-bounce rounded-full mx-auto w-20 h-20 items-center justify-center">
            <FaMapMarkerAlt className="mb-2 text-center text-black text-3xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">Address</h2>
          <p className="mb-2 text-base">73 Canal Street, Kolkata</p>
        </div>
        <div className="text-center rounded-md p-3 ">
          <div className="flex bg-[#809580]  animate-bounce  rounded-full mx-auto w-20 h-20 items-center justify-center">
            <MdAccessTimeFilled className="mb-2 text-center text-black text-4xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">OPENING HOURS</h2>
          <p className="mb-2 lg">Monday-Saturday: 8:00AM-9:00PM</p>
        </div>
        <div className="text-center rounded-md p-3 ">
          <div className="flex bg-[#809580]  animate-bounce  rounded-full mx-auto w-20 h-20 items-center justify-center">
            <IoCall className="mb-2 text-center text-black text-3xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">PHONE NUMBER</h2>
          <p className="mb-2 text-base">(+8777090567)</p>
        </div>
        <div className="text-center rounded-md p-3 ">
          <div className="flex  animate-bounce  bg-[#809580] rounded-full mx-auto w-20 h-20 items-center justify-center">
            <MdEmail className="mb-2 text-center text-black text-3xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">EMAIL</h2>
          <p className="mb-2 text-base">support@meetingroomlife.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
