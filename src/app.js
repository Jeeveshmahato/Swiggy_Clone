import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import Body from "./Components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contactus from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import Menu from "./Components/Menu";
import Error from "./Components/Error";
import Username from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
const Geocory = lazy(() => import("./Components/Grocery"));
const App = () => {
  const [usernamelog, setUserNamelog] = useState([]);
  useEffect(() => {
    const data = {
      name: "Guest",
    };
    setUserNamelog(data.name);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Provider store={appStore}>
        <Username.Provider value={{ localUser: usernamelog, setUserNamelog }}>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </Username.Provider>
      </Provider>
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
        path: "/restaurant/:resid",
        element: <Menu />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-3 border-swiggy-orange border-t-transparent rounded-full animate-spin"></div></div>}>
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
