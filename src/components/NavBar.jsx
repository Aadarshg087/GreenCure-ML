import React from "react";

const NavBar = () => {
  return (
    <div className="w-full border">
      <div className=" flex flex-row justify-between p-6 bg-green-800 text-white">
        <h2 className=" text-3xl font-winky">Welcome to GreenCure</h2>
        <img
          src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Img"
          className="h-[40px] rounded-full"
        />
      </div>
    </div>
  );
};

export default NavBar;
