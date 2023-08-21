import React, { useEffect, useState } from "react";
import Card from "../Pages/Instructor/Card";
import Classcard from "./Classcard";

const Classpage = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sportsedu.vercel.app/class");
        if (response.ok) {
          const data = await response.json();
          // Filter classes with status "approved"
          const approvedClasses = data.filter(
            (classItem) => classItem.status === "approved"
          );
          setClasses(approvedClasses);
        } else {
          console.log("Error fetching class data");
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="my-10 text-center">
        <h1 className="text-5xl font-bold">Our All Instructor</h1>
        <p className="text-3xl font-semibold mt-6 text-[#8e9cd5]">
          Choose it Your Own Instructor
        </p>
        <div className="w-2/3 md:w-full md:grid md:grid-cols-3 md:gap-4 m-auto text-center">
          {classes.map((item) => (
            <Classcard key={item._id} item={item}></Classcard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classpage;
