import React from "react"
import { useAppSelector } from "../../../store/hooks"
import { selectAllMatches } from "../../../store/crawler/crawlerSlice"
import { Box, Grid } from "@mui/material"
import ProductItem from "./ProductItem"


export default function ProductList() {
  const products = useAppSelector(selectAllMatches)

  return (
    <Box sx={ {flexGrow: 1} }>
      <Grid container spacing={ 2 }>
        { products && products.map(p => (
          <Grid item xs={ 3 } key={ p.id }>
            <ProductItem data={ p }/>
          </Grid>
        )) }
      </Grid>
    </Box>
  )
}
