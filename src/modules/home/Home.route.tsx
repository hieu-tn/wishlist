import React, { useEffect } from "react"
import { Container, Grid, Stack } from "@mui/material"
import "styles/modules/home/home.route.scss"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

import SearchForm from "modules/home/components/Search.form"
import { fetchProviders, selectAllProviders } from "../../store/crawler/crawlerSlice"


export default function HomeRoute() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProviders())
  }, [dispatch])

  let f = useAppSelector(selectAllProviders)
  console.log(f)

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
