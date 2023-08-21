import React from "react";

const PopularCard = ({ item }) => {
  const { name, description, image } = item;
  return (
    <div className="mt-6 text-center m-auto">
      <img
        className="md:w-[200px] w-1/2 m-auto md:h-[200px]"
        src={image}
        alt=""
      />
      <h1 className="text-3xl mt-4 font-bold">{name}</h1>
    </div>
  );
};

export default PopularCard;
