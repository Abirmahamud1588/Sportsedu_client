import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useInsta from "../Hook/useInsta";
import Swal from "sweetalert2";
import useCart from "../Hook/useCart";

const Classcard = ({ item }) => {
  const [isAdmin] = useAdmin(); // Assuming isInstrutor is coming from useAdmin
  const [isInsta] = useInsta();
  const { name, seat, price, image, email, _id } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, refetch] = useCart();

  const handleAddToCart = (item) => {
    if (user) {
      const cartItem = {
        courseItem: _id,
        name,
        image,
        price,
        email: user.email,
      };
      fetch("https://sportsedu.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch(); //refetch cart to update the number of carts
            Swal.fire("Food Added In The Cart", "success");
          }
        });
    } else {
      Swal.fire({
        title: "Not Logged In?",
        text: "You won't be able to add this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go To Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <div className="mt-6 text-center m-auto">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="w-full h-[400px]">
          <img src={image} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}!</h2>
          <h2 className="card-title">Price: {price} BDT</h2>
          <h2 className="card-title">Availble: {seat}</h2>
          <div className="card-actions justify-start">
            <div className="text-left badge badge-outline">{email}</div>
          </div>
          <button
            onClick={() => handleAddToCart(item)}
            disabled={isAdmin || isInsta}
            className="btn btn-outline bg-slate-600 border-0 text-white border-b-4 mt-4 border-orange-400
"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classcard;
