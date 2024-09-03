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
const Geocory = lazy(() => import("./Components/Grocery"));
const App = () => {
  const [usernamelog, setUserNamelog] = useState([]);
  useEffect(() => {
    const data ={
      name: "Mahatma",
    
    }
    setUserNamelog(data.name);
  }, []);

  return (
    <div>
     <Username.Provider value={{localUser:usernamelog , setUserNamelog}}>
     <Header />
     <Outlet />
     </Username.Provider>
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
