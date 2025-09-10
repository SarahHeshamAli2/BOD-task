import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import { Toaster } from "react-hot-toast"
import DashboardLayout from "./components/layout/dashboardLayout"
import Products from "./featuers/Products/products"
import AuthContextProvider from "./context/authContext"
import NotFound from "./pages/notFound"

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
},
{
  path : '*',
  element: <NotFound/>
}
])




  return (
    <>
      <Toaster/>
      <AuthContextProvider>
        <RouterProvider router={router}/>

      </AuthContextProvider>

    </>
  )
}
