import React from "react";
import img1 from "../../assets/velden_Tekengebied-1_Tekengebied-1.png";
const Sideway = () => {
  return (
    <div className="my-6">
      <h1 className="text-5xl font-bold text-center">Our Popular Course</h1>
      <p className="text-3xl font-semibold mt-6 text-center text-[#8e9cd5]">
        Make it Your Own Platform
      </p>
      <div className="md:flex p-4 mt-5  align-middle	 ">
        <div className="flex-shrink-0 md:w-1/2">
          <img src={img1} alt="" className="w-full h-auto rounded-lg" />
        </div>
        <div className="ml-4">
          <h2 className="text-4xl font-semibold">We are Course Manager</h2>
          <h3 className="text-xl mt-4 text-black-400">
            Alongside his role as senior lecturer, Rijsdijk is also an associate
            in the Environmental Humanities South programme at UCT. He teaches
            widely in the areas of film history and theory, and screenwriting,
            specialising in South African cinema and film and the environment.
            His research on the filmmaker cation Learning and Teaching
            Association of Southern Africa.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sideway;
