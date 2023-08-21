import React, { useEffect, useState } from "react";
import PopularCard from "./PopularCard";

const Popularinst = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch("instructor.json")
      .then((res) => res.json())
      .then((data) => {
        const topClasses = data
          .sort((a, b) => b.students - a.students)
          .slice(0, 6);
        setPopular(topClasses);
      });
  }, []);
  return (
    <div>
      <div className="my-10 text-center">
        <h1 className="text-5xl font-bold">Our Popular Instructor</h1>
        <p className="text-3xl font-semibold mt-6 text-[#8e9cd5]">
          Choose it Your Own Instructor
        </p>
        <div className="md:grid grid-cols-3 gap-4">
          {popular.map((item) => (
            <PopularCard key={item._id} item={item}></PopularCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popularinst;
