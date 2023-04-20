import { useAppSelector } from "../../../store/hooks"
import { selectAllMatches } from "../../../store/crawler/crawlerSlice"
import { Grid } from "@mui/material"
import ProductItemComponent from "./ProductItem.component"


export default function ProductListComponent() {
  const products = useAppSelector(selectAllMatches)

  return (
    <>
      <Grid container rowSpacing={ 1 } columnSpacing={ 2 }>
        { products && products.map(p => (
          <Grid xs={ 3 }>
            <ProductItemComponent data={ p }/>
          </Grid>
        )) }
      </Grid>
    </>
  )
}
