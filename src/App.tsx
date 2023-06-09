import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { createTheme, ThemeProvider } from "@mui/material"

import store from "./store/store"
import "styles/app.scss"
import DefaultLayout from "layouts/Default.layout"
import ErrorPage from "error-page"
import HomeRoute from "modules/home/Home.route"
import WishlistsRoute from "modules/wishlists/Wishlists.route"


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
        path: "/wishlists",
        element: <WishlistsRoute/>,
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
