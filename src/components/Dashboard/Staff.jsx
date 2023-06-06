import React, { useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { authUser, getAllFarmers, logout } from "../../redux/actions/auth";

import Home from "../Staff_routes/Home";
import Profile from "./Profile";

const Staff = () => {
  const [resize, setResize] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get all farmers
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      loadFarmers();
    }
    return () => (subscribed = false);
  }, []);
  const loadFarmers = useCallback(() => {
    dispatch(getAllFarmers());
  });
  const farmers = useSelector((state) => state?.auth?.farmers);
  // console.log("farmers aree", farmers);

  // get current logged in staff
  useEffect(() => {
    dispatch(authUser());
  }, []);
  const current_staff = useSelector((state) => state?.auth?.current_user);
  const fullname = `${current_staff?.firstname} ${current_staff?.lastname}`;

  // handle logout
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (!auth) {
      return navigate("/login");
    }
  }, [auth]);
  return (
    <section className="">
      <div
        //   className="left bg-blue fixed h-screen text-white p-3"
        className={
          resize
            ? "leftt bg-blue fixed h-screen text-white p-3 text-center"
            : "left bg-blue fixed h-screen text-white p-3 "
        }
      >
        <div
          className={
            resize
              ? " flex justify-center items-center"
              : "flex justify-between items-center"
          }
        >
          <div>
            <p className={resize ? "hidden" : "text-2xl p-2 text-orange"}>
              KIANJOKOMA COFFEE FACTORY
            </p>
          </div>
          {/* <div className="menu " onClick={() => setResize(!resize)}>
            <div></div>
            <div></div>
            <div></div>
          </div> */}
        </div>
        <ul className="mt-5">
          <Link to="/dashboard/staff">
            <li className="flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>Home</span>
            </li>
          </Link>

          <Link to="/dashboard/staff/profile">
            <li className=" flex  items-center space-x-2  cursor-pointer rounded px-3 py-2 hover:bg-gray-50 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>profile</span>
            </li>
          </Link>
        </ul>
      </div>
      <div
        className={
          resize
            ? "rightt bg-gray-50 absolute right-0 min-h-screen "
            : "right bg-gray-50 absolute right-0 min-h-screen "
        }
      >
        <main className="w-mobile mx-auto py-5">
          <div
            className=" flex justify-between  items-center h-16 border-b-[1px]
             "
          >
            <div>
              <h2 className="text-xl font-bold">Staff Dashboard.</h2>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 flex justify-center bg-blue text-white rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
          <div className="text-lg py-3 italic">
            <h2>Logged in as {fullname}</h2>
          </div>
          <Routes>
            <Route path="/" element={<Home farmers={farmers} />} />
            <Route
              path="/profile"
              element={<Profile currentUser={current_staff} />}
            />
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Staff;
const loop = [1, 2, 3, 4];
