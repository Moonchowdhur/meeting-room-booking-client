import App from "@/App";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AboutUs from "@/pages/aboutUs/AboutUs";
import AllRoomByTabular from "@/pages/admin/rooms/AllRoomByTabular";
import SingleRoom from "@/pages/admin/rooms/SingleRoom";
import AllBookingByTabular from "@/pages/booking/AllBookingByTabular";
import BookingProcess from "@/pages/booking/BookingProcess";

import CreateBooking from "@/pages/booking/CreateBooking";
import MyBooking from "@/pages/booking/MyBooking";
import Checkout from "@/pages/checkout/Checkout";
import ContactUs from "@/pages/contactUs/ContactUs";
import ErrorPage from "@/pages/errorPage/ErrorPage";
import Home from "@/pages/home/Home";
import MeetingRooms from "@/pages/MeetingRooms/MeetingRooms";
import PrivacyPolicy from "@/pages/privacyPolicy/privacyPolicy";
import AllSlotByTabular from "@/pages/slot/AllSlotByTabular";
import Terms from "@/pages/terms/Terms";

import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      //   {
      //     path: "contacts/:contactId",
      //     element: <Contact />,
      //   },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms",
        element: <MeetingRooms />,
      },
      {
        path: `/room/:id`,
        element: (
          <ProtectedRoute role="user">
            <SingleRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: `/book/:id`,
        element: (
          <ProtectedRoute role="user">
            <BookingProcess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <AboutUs />,
      },

      {
        path: "/terms-of-service",
        element: <Terms />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },

      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role="user">
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-booking",
        element: (
          <ProtectedRoute role="user">
            <MyBooking />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: <MainLayout />,
        children: [
          {
            //jkhn clickable hbe ,, // -> /dashboard/create-booking as dashboard er under e eta
            path: "create-booking",
            element: <CreateBooking />,
          },
          {
            path: "all-booking",
            element: (
              <ProtectedRoute role="admin">
                <AllBookingByTabular />
              </ProtectedRoute>
            ),
          },
          {
            path: "all-room",
            element: (
              <ProtectedRoute role="admin">
                <AllRoomByTabular />
              </ProtectedRoute>
            ),
          },
          {
            path: "all-slot",
            element: (
              <ProtectedRoute role="admin">
                <AllSlotByTabular />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
