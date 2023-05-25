import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { blueGrey, purple, teal } from "@mui/material/colors"

import { WishlistItemProps } from "../models/wishlist.model"
import { useAppSelector } from "../../../store/hooks"
import * as wishlistActions from "store/wishlist/wishlistSlice"


export default function WishlistItem({id}: WishlistItemProps) {
  const _useAppSelector = useAppSelector
  const data = useAppSelector(state => wishlistActions.selectWishlistById(state, id))

  const displayProduct = (productId: string) => {
    let product = _useAppSelector(state => wishlistActions.selectProductById(state, productId))

    if (!product) return

    return (
      <Box key={ product.id }>
        <Grid container columnSpacing={ 2 } rowSpacing={ 1 }>
          <Grid item xs={ 2 }>
            <img src={product.imageUrl} title={product.name}/>
          </Grid>
          <Grid item xs={ 6 }>
            <Typography fontSize="large"><strong>{product.name}</strong></Typography>
            <Typography fontSize="large"><strong>{product.description}</strong></Typography>
            <Typography fontSize="large"><strong>{product.provider}</strong></Typography>
          </Grid>
          <Grid item xs={ 4 }>
            <Typography>{product.regularPrice}</Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={ {py: 2, flexGrow: 1} }>
      <Grid container columnSpacing={ 2 } rowSpacing={ 2 }>
        <Grid item xs={ 8 } sx={ {borderRight: "1px solod black"} }>
          <Accordion>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon/> }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><strong>{ data?.name }</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              { data?.products && data.products.map(pId => displayProduct(pId)) }
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={ 4 }>
          <Box sx={ {border: `1px solid ${ blueGrey[300] }`, p: 2, pb: 4, borderRadius: "12px"} }>
            <Typography variant="h5" sx={ {color: purple[800], pb: 2} }><strong>{ data?.name }</strong></Typography>
            <Box>
              <Grid container spacing={ 1 }>
                <Grid item xs={ 6 }>
                  <Typography>Items</Typography>
                </Grid>
                <Grid item xs={ 6 }>
                  <Typography>2</Typography>
                </Grid>
                <Grid item xs={ 6 }>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item xs={ 6 }>
                  <Typography variant="h6" sx={ {color: teal[700]} }><strong>$40</strong></Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

}
