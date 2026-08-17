import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import AuthRoutes from './AuthRoutes'
import PrivateRoutes from './PrivateRoutes'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
       {PublicRoutes}
        {AuthRoutes}
        {PrivateRoutes}
    </>
  )
)
export default routes