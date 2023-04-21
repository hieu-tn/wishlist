import React from "react"
import { useAppSelector } from "../../../store/hooks"
import { selectAllMatches } from "../../../store/crawler/crawlerSlice"
import { Box, Grid } from "@mui/material"
import ProductItemComponent from "./ProductItem.component"


export default function ProductListComponent() {
  const products = useAppSelector(selectAllMatches)

  return (
    <Box sx={ {flexGrow: 1} }>
      <Grid container>
        { products && products.map(p => (
          <Grid item xs={ 3 } key={ p.id }>
            <ProductItemComponent data={ p }/>
          </Grid>
        )) }
      </Grid>
    </Box>
  )
}
