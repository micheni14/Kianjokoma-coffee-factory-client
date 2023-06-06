import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
("react-router-dom");
import "./App.css";

import Admin from "./components/Dashboard/Admin";
import Farmer from "./components/Dashboard/Farmer";
import Staff from "./components/Dashboard/Staff";

import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
// import Farmers from "./components/Staff_routes/Farmers";
import Auth from "./middleware/Auth";

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* <Route element={<Auth />}> */}
            <Route path="/dashboard/admin/*" element={<Admin />} />
            <Route path="/dashboard/staff/*" element={<Staff />} />
            <Route path="/dashboard/farmer/*" element={<Farmer />} />
          {/* </Route> */}
        </Routes>
        {/* <Footer /> */}
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
