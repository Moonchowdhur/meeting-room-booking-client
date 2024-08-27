import { Link, NavLink } from "react-router-dom";
// import key from "../../assets/images/key.jpg";
// import { FaCartPlus } from "react-icons/fa";

// import { Badge } from "../ui/badge";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Logout } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  console.log(user);

  function handleLogOut() {
    dispatch(Logout());
  }

  return (
    <div className="bg-[#49674a]  top-0 z-20  flex items-center justify-between font-medium  h-[70px] p-4 md:px-12  text-white ">
      {/* keyboard logo or name */}
      <Link to="/" className="flex gap-2 items-center">
        <img
          src="https://i.ibb.co/tZNs5QG/infinity-business-centre-salt-lake-city-sector-5-kolkata-offices-on-hire-wmy3f.jpg"
          className="md:w-12 md:h-10 w-6 h-6 rounded-full"
          alt=""
        />
        <h2 className="text-base md:text-2xl">
          Meeting <span className="text-[#FAFFAF]">Room </span> Bookings
        </h2>
      </Link>
      {/* others */}
      <div>
        <ul
          className={`md:flex gap-8 z-10 md:bg-transparent text-white  font-medium md:static absolute text-xl items-center ${
            open
              ? "top-20 right-7 p-3 bg-[#695802]  text-black"
              : "-top-48 right-0"
          } `}
        >
          <li className="text-xl">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? " text-[#FAFFAF]" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink
              to="/rooms"
              className={({ isActive }) => (isActive ? " text-[#FAFFAF]" : "")}
            >
              Meeting Rooms
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink
              to="about"
              className={({ isActive }) => (isActive ? " text-[#FAFFAF]" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? " text-[#ECC500]" : "")}
            >
              Contact Us
            </NavLink>
          </li>
          {user?.role === "admin" && (
            <li className="text-xl">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? " text-[#ECC500]" : ""
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {user?.role === "user" && (
            <li className="text-xl">
              <NavLink
                to="/my-booking"
                className={({ isActive }) =>
                  isActive ? " text-[#ECC500]" : ""
                }
              >
                My Bookings
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {/* login or logout */}
      <div>
        {user?.email ? (
          <button
            onClick={handleLogOut}
            className="text-base p-2 border-2  rounded-lg border-[#FAFFAF]"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? " text-[#FAFFAF]"
                : "text-base p-2 border-2  rounded-lg border-[#FAFFAF]"
            }
          >
            Login
          </NavLink>
        )}
      </div>
      {/* hambarg menu */}
      <div className="md:hidden text-xl" onClick={() => setOpen(!open)}>
        {open ? <ImCross /> : <FaHamburger />}
      </div>
    </div>
  );
};

export default Navbar;
