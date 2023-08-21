import React, { useEffect, useState } from "react";
import PopularCard from "../Home/PopularCard";
import Card from "./Card";

const Instructor = () => {
  const [instructorUsers, setInstructorUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sportsedu.vercel.app/user");
        if (response.ok) {
          const data = await response.json();
          // Filter users with role "instructor"
          const instructorData = data.filter(
            (user) => user.role === "instructor"
          );
          setInstructorUsers(instructorData);
        } else {
          console.log("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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
          {instructorUsers.map((item) => (
            <Card key={item._id} item={item}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructor;
