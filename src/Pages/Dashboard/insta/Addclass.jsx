import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProviders";

const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const Addclass = () => {
  const { user } = useContext(AuthContext);
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgResponse = await fetch(image_hosting_url, {
        method: "POST",
        body: formData,
      });

      if (imgResponse.ok) {
        const imgResponseData = await imgResponse.json();
        if (imgResponseData.success) {
          const imgUrl = imgResponseData.data.display_url;
          const { name, price, seat, email } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            email,
            seat: parseInt(seat),
            image: imgUrl,
          };

          console.log(newItem);

          try {
            const response = await fetch("https://sportsedu.vercel.app/class", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem),
            });

            if (response.ok) {
              const responseData = await response.json();
              if (responseData.insertedId) {
                reset();
                Swal.fire("Class Added In The Chart", "success");
              }
            } else {
              console.log("Error posting new class item");
            }
          } catch (error) {
            console.error("Error posting new class item:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("name", { required: true, maxLength: 80 })}
            className="input input-bordered w-full "
          />
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Instructor email*</span>
            </label>
            <select
              {...register("email", { required: true })}
              defaultValue="Pick One"
              className="select select-bordered"
            >
              <option>{user.email}</option>
            </select>
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Available seat*</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              {...register("seat", { required: true })}
              className="input input-bordered w-full "
            />
          </div>

          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              {...register("price", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default Addclass;
