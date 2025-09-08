import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import { Toaster } from "react-hot-toast"

export default function App() {



const router = createBrowserRouter([{
  path:'login',element:<Login/>,
},

{
  path:'/',element:<Login/>
},
{
  path:'dashboard',element:<Dashboard/>
}
])




  return (
    <>
      <Toaster/>
        <RouterProvider router={router}/>

    </>
  )
}
