import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main.jsx";
import Home from "./Pages/Home/Home.jsx";
import Instructor from "./Pages/Instructor/Instructor.jsx";
import Login from "./Pages/Login/Login.jsx";
import Registration from "./Pages/Login/Registration.jsx";
import AuthProviders from "./Providers/AuthProviders.jsx";
import Privateroute from "../Route/Privateroute.jsx";
import Dashboard from "./Layout/Dashboard.jsx";
import User from "./Pages/Dashboard/Admin/User.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Addclass from "./Pages/Dashboard/insta/Addclass.jsx";
import Showclass from "./Pages/Dashboard/insta/Showclass.jsx";
import Manageclass from "./Pages/Dashboard/Admin/Manageclass.jsx";
import Classpage from "./Classpage/Classpage.jsx";
import Mycart from "./Pages/Dashboard/student/Mycart.jsx";
import Payment from "./Pages/Dashboard/student/Payment.jsx";
import Mycourse from "./Pages/Dashboard/student/Mycourse.jsx";
import Adminr from "./Routes/Adminr.jsx";
import Instar from "./Routes/Instar.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructor",
        element: <Instructor />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign",
        element: <Registration />,
      },
      {
        path: "classpage",
        element: <Classpage></Classpage>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <Privateroute>
        <Dashboard></Dashboard>
      </Privateroute>
    ),
    children: [
      {
        path: "user",
        element: (
          <Adminr>
            {" "}
            <User></User>
          </Adminr>
        ),
      },
      {
        path: "addclass",
        element: (
          <Instar>
            <Addclass></Addclass>
          </Instar>
        ),
      },
      {
        path: "showclass",
        element: (
          <Instar>
            <Showclass></Showclass>
          </Instar>
        ),
      },
      {
        path: "manageclass",
        element: (
          <Adminr>
            <Manageclass></Manageclass>
          </Adminr>
        ),
      },
      {
        path: "mycart",
        element: <Mycart></Mycart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "mycourse",
        element: <Mycourse></Mycourse>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="max-w-screen-2xl mx-auto  ">
        <AuthProviders>
          <RouterProvider router={router} />
        </AuthProviders>
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
