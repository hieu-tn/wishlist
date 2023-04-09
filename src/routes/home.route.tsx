import {Container, Grid, Stack} from '@mui/material'
import 'styles/routes/home.scss'

import SearchForm from "components/forms/search.form"
import ProductItemComponent from "components/common/product-item.component"


export default function HomeRoute() {

  return (
    <>
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <SearchForm/>
        </Stack>
      </Container>

      <section className="results">
        <Container>
          <Grid container columnSpacing={2}>
            {/*{products && products.map(p => (*/}
            {/*  <Grid xs={3} item={true} key={p.name}>*/}
            {/*    <ProductItemComponent data={p}/>*/}
            {/*  </Grid>*/}
            {/*))}*/}
          </Grid>
        </Container>
      </section>
    </>
  )
}
