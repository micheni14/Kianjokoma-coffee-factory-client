import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <section
      style={{
        backgroundImage:
          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0IC_BosdSoJUPJvpmA0dxjqnmSEoG5Qablw&usqp=CAU)",
      }}
      className="bg-no-repeat bg-cover   w-full min-h-screen bg-blue text-white bg-blend-multiply    flex flex-col  "
    >
      <div className="w-mobile md:w-container_width mx-auto space-y-32 ">
        <div
          className=" flex justify-between items-center h-24  "
          style={{ borderBottom: "1px solid #fff" }}
        >
          <div>
            <p className="uppercase">Kianjokoma coffee Factory</p>
          </div>
          <div>
            <Link to="/login">
              <button className="bg-orange rounded px-4 py-2 ">Login</button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-4/5 space-y-10 text-center md:text-left">
          <p className="text-3xl md:text-5xl font-bold">
            Your Favourite Coffee Factory Management System
          </p>
          <div>
            <Link to="/login">
              <button className="bg-orange py-4 px-6 rounded-full">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
