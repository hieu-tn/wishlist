import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./app/store"

import DefaultLayout from "layouts/Default.layout"
import ErrorPage from "error-page"
import HomeRoute from "modules/home/Home.route"
import WishlistRoute from "modules/wishlist/Wishlist.route"


const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomeRoute/>,
      },
      {
        path: "/wishlist",
        element: <WishlistRoute/>,
      },
    ],
  },
])

export default function App() {
  return (
    <Provider store={ store }>
      <RouterProvider router={ router }/>
    </Provider>
  )
}
