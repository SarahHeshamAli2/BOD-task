import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import { Toaster } from "react-hot-toast"
import DashboardLayout from "./components/layout/dashboardLayout"
import Products from "./featuers/Products/products"

export default function App() {



const router = createBrowserRouter([{
  path:'login',element:<Login/>,
},

{
  path:'/',element:<Login/>
},
{
  path: 'dashboard',
  element: <DashboardLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'products', element: <Products /> }
  ]
}
])




  return (
    <>
      <Toaster/>
        <RouterProvider router={router}/>

    </>
  )
}
