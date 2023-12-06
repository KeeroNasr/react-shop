import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { getProductsList } from './api/Api'
import Layout from './components/layout/Layout'
import ProductDetails from './components/products/ProductDetails'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
          loader:getProductsList
        },
        {
          path: '/product/:id',
          element: <ProductDetails />
        },
        {
          path: '/cart',
          element:<Cart/>
        },
        {
          path: '/login',
          element:<Login/>
        }
      ]
       
    }
  ])

  return (
    <div className=' font-bodyFont'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
