import React from 'react'
import { Route } from 'react-router-dom'
import Profile from '../pages/Profile/Profile'
import AddBlog from '../pages/AddBlog/AddBlog'
import EditBlog from '../pages/EditBlog/EditBlog'
import MyBlogs from '../pages/MyBlogs/MyBlogs'
import MainLayout from '../layouts/MainLayout'

const PrivateRoutes =( <Route element={<MainLayout/>}>
         <Route path="/my-blogs" element={<MyBlogs />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/add-blog" element={<AddBlog />} />
         <Route path="/edit-blog/:id" element={<EditBlog />} />
     </Route>) 

export default PrivateRoutes