import React from "react"
import { Outlet, useNavigation } from "react-router-dom"

import Header from "components/includes/Header"
import Footer from "components/includes/Footer"
import ToastStack from "../components/common/ToastStack"


export default function DefaultLayout() {
  const navigation = useNavigation()

  return (
    <>
      <Header/>

      <main
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet/>
      </main>

      <ToastStack/>

      <Footer/>
    </>
  )
}
