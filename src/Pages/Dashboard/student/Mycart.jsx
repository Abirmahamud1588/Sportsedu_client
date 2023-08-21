import React from "react";
import { FaShoppingCart, FaCalendar, FaHome, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useCart from "../../../Hook/useCart";

const Mycart = () => {
  const [cart, refetch] = useCart();
  const { image, price, name } = cart;
  const totalprice = cart.reduce((sum, item) => item.price + sum, 0);
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://sportsedu.vercel.app/carts/${item._id}`, {
          // Corrected URL and method name
          method: "DELETE", // Corrected method name
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full ml-16 mt-16 h-full ">
      <div className="flex justify-evenly bg-slate-500 py-4  items-center w-full">
        <h1 className="text-2xl text-white font-medium">
          Total Order: {cart.length}
        </h1>
        <h1 className="text-2xl text-white font-medium">
          Total Price: ${totalprice}
        </h1>
        <Link to="/dashboard/payment">
          {" "}
          <button className="btn  bg-slate-300">Pay</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl">
              <th className="text-xl">SN</th>
              <th className="text-xl">Food</th>
              <th className="text-xl">Item Name</th>
              <th className="text-xl">Price</th>
              <th className="text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {cart.map((item, index) => (
              <tr key={item._id} item={item}>
                <td>
                  <h3>{index + 1}</h3>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-success badge-md">
                    {item.name}
                  </span>
                </td>
                <td className="text-center">{item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn bg-slate-900 text-white hover:text-red-700 btn-md"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mycart;
