import React from "react"
import { Container, Grid } from "@mui/material"
import "styles/modules/home/home.route.scss"

import SearchForm from "modules/home/components/Search.form"
import ProductList from "./components/ProductList"
import { useGetProvidersQuery } from "store/crawler/crawlerSlice"
import { useGetWishlistsQuery } from "store/wishlist/wishlistSlice"


export default function HomeRoute() {
  useGetProvidersQuery(null)
  useGetWishlistsQuery(null)

  return (
    <>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={ 6 }>
            <SearchForm/>
          </Grid>
        </Grid>
      </Container>

      <section className="results">
        <Container>
          <ProductList/>
        </Container>
      </section>
    </>
  )
}
