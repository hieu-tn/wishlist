import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/store"

import DefaultLayout from "layouts/Default.layout"
import ErrorPage from "error-page"
import HomeRoute from "modules/home/Home.route"
import WishlistRoute from "modules/wishlist/Wishlist.route"
import { createTheme, ThemeProvider } from "@mui/material"


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

const theme = createTheme({})


export default function App() {
  return (
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <RouterProvider router={ router }/>
      </ThemeProvider>
    </Provider>
  )
}
