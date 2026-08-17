import React from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import Profile from "../pages/Profile/Profile";
import AddBlog from "../pages/AddBlog/AddBlog";
import EditBlog from "../pages/EditBlog/EditBlog";
import MyBlogs from "../pages/MyBlogs/MyBlogs";
import Chat from "../pages/Chat/Chat";
import ChatPage from "../pages/Chat/ChatPage";

const PrivateRouteGuard = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

const PrivateRoutes = (
  <Route element={<PrivateRouteGuard />}>
    <Route element={<MainLayout />}>
      <Route path="/my-blogs" element={<MyBlogs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-blog" element={<AddBlog />} />
      <Route path="/edit-blog/:id" element={<EditBlog />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:receiverId" element={<ChatPage />} />
    </Route>
  </Route>
);

export default PrivateRoutes;