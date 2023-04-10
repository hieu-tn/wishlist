import React from "react"
import { Container, Grid, Stack } from "@mui/material"
import "styles/modules/home/home.route.scss"

import SearchForm from "modules/home/components/Search.form"


export default function HomeRoute() {

  return (
    <>
      <Container>
        <SearchForm/>
      </Container>

      <section className="results">
        <Container>
          <Grid container columnSpacing={ 2 }>
            {/*{products && products.map(p => (*/ }
            {/*  <Grid xs={3} item={true} key={p.name}>*/ }
            {/*    <ProductItemComponent data={p}/>*/ }
            {/*  </Grid>*/ }
            {/*))}*/ }
          </Grid>
        </Container>
      </section>
    </>
  )
}
