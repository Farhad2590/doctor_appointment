import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import React from "react";
import Faq from "../pages/Faq/Faq";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import BookingPage from "../pages/BookingPage/BookingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/faq", element: <Faq></Faq> },
      { path: "/contact", element: <Contact></Contact> },
      { path: "/book/:doctorId", element: <BookingPage></BookingPage> },
    ],
  },
]);
