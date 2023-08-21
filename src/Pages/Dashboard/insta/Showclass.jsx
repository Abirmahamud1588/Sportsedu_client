import React, { useEffect, useState } from "react";
import { FaEdit, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Showclass = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sportsedu.vercel.app/class");
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        } else {
          console.log("Error fetching class data");
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    }

    fetchData();
  }, []);
  //   const handleDelete = (item) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         fetch(`https://newrestaurant-ten.vercel.app/menu/${item._id}`, {
  //           // Corrected URL and method name
  //           method: "DELETE", // Corrected method name
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             if (data.deletedCount > 0) {
  //               refetch();
  //               Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //             }
  //           });
  //         console.log(result);
  //       }
  //     });
  //   };
  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>image</th>
              <th>name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Enroolled</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>

                <td>{item.price}</td>
                <td className="badge badge-secondary badge-outline">
                  {item.status}
                </td>
                <td>{item.enrolled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Showclass;
