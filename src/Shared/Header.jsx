import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import useCart from "../Hook/useCart";
import { FaCartPlus } from "react-icons/fa";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const handlelogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div className=" bg-[#8e9cd5] ">
      <div className="navbar ">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">SportsEDu</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4 px-1 text-slate-900 items-center  font-bold ">
            <Link to="/" className="text-xl ">
              Home
            </Link>
            <Link to="/instructor" className="text-xl ">
              Instructor
            </Link>

            <Link to="/classpage" className="text-xl ">
              Class Page
            </Link>

            {
              // if user availabe
              user ? (
                <>
                  <img
                    className="w-[50px] h-[50px] rounded"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />

                  <Link to="/dashboard/mycart" className="text-xl text-white">
                    <span className="flex items-center space-x-2">
                      <FaCartPlus></FaCartPlus>

                      <div className="badge badge-secondary">
                        +{cart?.length || 0}
                      </div>
                    </span>
                  </Link>

                  <button
                    onClick={handlelogout}
                    className="btn btn-warning  text-xl"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                //if not availble
                <>
                  <Link to="/login" className="text-xl ">
                    {" "}
                    Login{" "}
                  </Link>
                </>
              )
            }
          </ul>
        </div>
        <div className="navbar-end"></div>
      </div>
    </div>
  );
};

export default Header;
