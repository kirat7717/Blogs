import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";

import BlogDetails from "../pages/BlogDetails/BlogDetails";
import Dev from "../pages/dev/Dev";
import NotFound from "../pages/NotFound/NotFound";
const PublicRoutes = (
  <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
    <Route index element={<Home />} />

    <Route path="/blog/:id" element={<BlogDetails />} />
    {/* Development Page */}
    <Route path="/dev" element={<Dev />} />
  </Route>
);

export default PublicRoutes;
