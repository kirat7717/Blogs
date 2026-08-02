import React from "react";
import {
  Route,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";

import BlogDetails from "../pages/BlogDetails/BlogDetails";
import Dev from "../pages/dev/Dev";
import NotFound from "../pages/NotFound/NotFound";
import Chat from "../pages/Chat/Chat";
import ChatPage from "../pages/Chat/ChatPage";
const PublicRoutes = (
  <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
    <Route index element={<Home />} />

    <Route path="/blog/:id" element={<BlogDetails />} />
    {/* Development Page */}
    <Route path="/dev" element={<Dev />} />
     <Route path="/chat" element={<Chat />} />
    <Route path="/chat/:receiverId" element={<ChatPage />} />
  </Route>
);

export default PublicRoutes;
