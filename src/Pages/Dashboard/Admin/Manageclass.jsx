import React, { useEffect, useState } from "react";
import { FaCheckSquare, FaEdit, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Manageclass = () => {
  const queryClient = useQueryClient(); // Initialize useQueryClient

  // Fetch users query
  const { data: users = [] } = useQuery(["users"], async () => {
    const response = await fetch("https://sportsedu.vercel.app/class");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  });

  // Mutation for making a user an admin
  const makeApprovedMutation = useMutation(
    (userId) =>
      fetch(`https://sportsedu.vercel.app/class/approved/${userId}`, {
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
      fetch(`https://sportsedu.vercel.app/class/declined/${userId}`, {
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

  const handlemakeapproved = (user) => {
    makeApprovedMutation.mutate(user._id);
  };

  const handlemakedecline = (user) => {
    makeinstructorMutation.mutate(user._id);
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly bg-[#8e9cd5] py-4  items-center w-full">
        <h1 className="text-2xl text-white font-medium">Manage Class</h1>
      </div>
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
              <th>Enrolled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
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
                <td>
                  <button
                    onClick={() => handlemakeapproved(item)}
                    className="btn bg-slate-900 text-white hover:text-red-700 btn-md"
                  >
                    <FaCheckSquare></FaCheckSquare>
                  </button>
                  <button
                    onClick={() => handlemakedecline(item)}
                    className="btn bg-slate-900 text-white hover:text-red-700 btn-md"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manageclass;
