import React, { useEffect, useState } from "react";
import PopularCard from "./PopularCard";

const Popularclass = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch("class.json")
      .then((res) => res.json())
      .then((data) => {
        const topClasses = data
          .sort((a, b) => b.students - a.students)
          .slice(0, 6);
        setPopular(topClasses);
      });
  }, []);

  return (
    <div className="my-10 text-center">
      <h1 className="text-5xl font-bold">Our Popular Course</h1>
      <p className="text-3xl font-semibold mt-6 text-[#8e9cd5]">
        Make it Your Own Platform
      </p>
      <div className="md:grid grid-cols-3 gap-4">
        {popular.map((item) => (
          <PopularCard key={item._id} item={item}></PopularCard>
        ))}
      </div>
    </div>
  );
};

export default Popularclass;
