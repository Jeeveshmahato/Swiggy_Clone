import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Body from "./Components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contactus from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import Menu from "./Components/Menu";
import Error from "./Components/Error";

const Geocory = lazy(() => import("./Components/Grocery"));
const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contactus",
        element: <Contactus />,
      },
      {
        path: "/resturant/:resid",
        element: <Menu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading Geocery ....</h1>}>
            <Geocory />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
