import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaWallet,
  FaNetworkWired,
  FaSellcast,
  FaWeebly,
  FaPaypal,
} from "react-icons/fa";
import useAdmin from "../Hook/useAdmin"; // Assuming useAdmin handles isAdmin and isInstrutor
import useInsta from "../Hook/useInsta";

const Dashboard = () => {
  const [isAdmin] = useAdmin(); // Assuming isInstrutor is coming from useAdmin
  const [isInsta] = useInsta();

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          {isAdmin ? (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content for admin */}
              <li>
                <Link to="/">
                  <FaHome /> Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/user">
                  <FaShoppingCart /> All Users
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manageclass">
                  <FaWeebly /> Manage Class
                </Link>
              </li>
              {/* Add more admin-specific menu items if needed */}
            </ul>
          ) : isInsta ? (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content for instructor */}
              <li>
                <li>
                  <Link to="/">
                    <FaHome /> Home
                  </Link>
                </li>
                <Link to="/dashboard/addclass">
                  <FaNetworkWired /> Add Class
                </Link>
              </li>
              <li>
                <Link to="/dashboard/showclass">
                  <FaSellcast /> Show Class
                </Link>
              </li>
              {/* Add more instructor-specific menu items if needed */}
            </ul>
          ) : (
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content for non-admin and non-instructor */}
              <li>
                <Link to="/">
                  <FaShoppingCart /> Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/mycart">
                  <FaShoppingCart /> cart
                </Link>
              </li>
              <li>
                <Link to="/dashboard/mycourse">
                  <FaPaypal /> My COurse
                </Link>
              </li>
              {/* Add more non-admin/instructor-specific menu items if needed */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
