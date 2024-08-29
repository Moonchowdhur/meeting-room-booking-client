/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Link, Outlet } from "react-router-dom";
import { createPortal } from "react-dom";

const Backdrop = ({ onClick }: any) => {
  return createPortal(
    <div
      className="fixed inset-0 z-20"
      // className="fixed inset-0 bg-red-200 opacity-50 z-20"
      onClick={onClick}
    />,
    document.body
  );
};

const MainLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        id="sidebar"
        className={` z-20 inset-y-0 left-0 w-64 sticky h-6/12 bg-[#5b765c] text-white transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4">
          <h1 className="text-lg mb-4 text-center">{user?.email}</h1>
          <div className="w-full h-[1px] bg-white"></div>
        </div>
        <ul className="p-4">
          {user?.role === "admin" && (
            <>
             
              <li className="mb-2">
                <Link
                  to="/dashboard/all-room"
                  className="block px-4 py-2 hover:bg-[#628a62] rounded"
                >
                  All Room
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/all-slot"
                  className="block px-4 py-2 hover:bg-[#628a62] rounded"
                >
                  All Slot
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/all-booking"
                  className="block px-4 py-2 hover:bg-[#628a62] rounded"
                >
                  All Booking
                </Link>
              </li>
            </>
          )}
          {user?.role === "user" && (
            <li className="mb-2">
              <Link
                to="/dashboard/create-booking"
                className="block px-4 py-2 hover:bg-[#628a62] rounded"
              >
                Create Booking
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Backdrop */}
      {/* newly added */}
      {isSidebarOpen && <Backdrop onClick={() => setIsSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 ml-0 lg:ml-12 p-4">
        <button
          id="toggleSidebar"
          className="lg:hidden bg-[#5b765c] text-white px-4 py-2 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close drawer" : "Open drawer"}
        </button>
        <div className="mt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
