import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaUserAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const User = () => {
  const queryClient = useQueryClient(); // Initialize useQueryClient

  // Fetch users query
  const { data: users = [] } = useQuery(["users"], async () => {
    const response = await fetch("https://sportsedu.vercel.app/user");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  });

  // Mutation for making a user an admin
  const makeAdminMutation = useMutation(
    (userId) =>
      fetch(`https://sportsedu.vercel.app/user/admin/${userId}`, {
        method: "PATCH",
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        if (data.modifiedCount) {
          toast.success("User is Updated  Now", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          queryClient.invalidateQueries("users"); // Invalidate the "users" query
        }
      },
    }
  );
  const makeinstructorMutation = useMutation(
    (userId) =>
      fetch(`https://sportsedu.vercel.app/user/instructor/${userId}`, {
        method: "PATCH",
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        if (data.modifiedCount) {
          toast.success("User is Updated  Now", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          queryClient.invalidateQueries("users"); // Invalidate the "users" query
        }
      },
    }
  );

  const handlemakeadmin = (user) => {
    makeAdminMutation.mutate(user._id);
  };

  const handlemakeinstructor = (user) => {
    makeinstructorMutation.mutate(user._id);
  };
  // const handledeleteuser = (user) => {};
  return (
    <div>
      <div className="w-full ml-16 mt-16 h-full ">
        <div className="flex justify-evenly bg-[#8e9cd5] py-4  items-center w-full">
          <h1 className="text-2xl text-white font-medium">
            Total users: {users.length}
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl">
                <th className="text-xl">SN</th>
                <th className="text-xl">Name</th>
                <th className="text-xl"> Email</th>
                <th className="text-xl"> Image</th>

                <th className="text-xl">Admin Role</th>
                <th className="text-xl">Instructor Role</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {users.map((user, index) => (
                <tr key={user._id} user={user}>
                  <td>
                    <h3>{index + 1}</h3>
                  </td>

                  <td>
                    <span className="badge badge-success badge-md">
                      {user.name}
                    </span>
                  </td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">
                    <img
                      className="w-[60px] h-[60px]"
                      src={user.image}
                      alt=""
                    />
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <>
                        <button
                          onClick={() => handlemakeadmin(user)}
                          className="btn bg-orange-900 text-white hover:text-yellow-700 btn-md"
                        >
                          <FaUserAlt></FaUserAlt>
                        </button>
                      </>
                    )}
                  </td>

                  <td>
                    {user.role === "instructor" ? (
                      "instructor"
                    ) : (
                      <>
                        <button
                          onClick={() => handlemakeinstructor(user)}
                          className="btn bg-yellow-900 text-white hover:text-yellow-700 btn-md"
                        >
                          <FaUserAlt></FaUserAlt>
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      // onClick={() => handledeleteuser(user)}
                      className="btn bg-slate-900 text-white hover:text-red-700 btn-md"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 2 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
