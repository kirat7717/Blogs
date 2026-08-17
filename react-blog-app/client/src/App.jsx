import React from 'react'
import Home from './pages/Home/Home'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'


function App() {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App