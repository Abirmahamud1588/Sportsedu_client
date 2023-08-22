import React from "react";

const Card = ({ item }) => {
  const { name, description, image, email } = item;
  return (
    <div className="mt-6 text-center m-auto">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img className="w-full h-[300px] object-cover" src={image} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name: {name}!</h2>
          <div className="card-actions justify-start">
            <div className="text-left badge badge-outline">Email: {email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
