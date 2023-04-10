import React from "react"
import { Outlet, useNavigation } from "react-router-dom"

import Header from "components/includes/header"
import Footer from "components/includes/footer"


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

      <Footer/>
    </>
  )
}