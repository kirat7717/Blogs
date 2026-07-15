import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";

const  AuthRoutes = ( 
         <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Route>) 
  


export default AuthRoutes;
