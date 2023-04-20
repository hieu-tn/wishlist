import React from "react"
import { Container } from "@mui/material"
import "styles/modules/home/home.route.scss"

import SearchForm from "modules/home/components/Search.form"
import ProductListComponent from "./components/ProductList.component"


export default function HomeRoute() {
  return (
    <>
      <Container>
        <SearchForm/>
      </Container>

      <section className="results">
        <Container>
          <ProductListComponent/>
        </Container>
      </section>
    </>
  )
}
