import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { blueGrey, purple, teal } from "@mui/material/colors"

import { WishlistItemProps } from "../models/wishlist.model"
import { useAppSelector } from "../../../store/hooks"
import * as wishlistActions from "store/wishlist/wishlistSlice"
import { useEffect, useState } from "react"


export default function WishlistItem({id}: WishlistItemProps) {
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const data = useAppSelector(state => wishlistActions.selectWishlistById(state, id))

  useEffect(() => {
    setTotalProducts(prevState => data?.products.length || 0)
    setTotalPrice(prevState => {
      if (!data || !data.products) return 0
      return data.products.reduce((accumulator, val) => {
        let price = parseFloat(val.regularPrice)
        if (isNaN(price)) price = parseFloat(val.regularPrice.substring(1))
        return accumulator + price
      }, 0)
    })
  }, [data])

  return (
    <Box sx={ {py: 2, flexGrow: 1} }>
      <Grid container columnSpacing={ 2 } rowSpacing={ 2 }>
        <Grid item xs={ 8 }>
          <Accordion>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon/> }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={ {background: blueGrey[100]} }
            >
              <Typography variant="h6"><strong>{ data?.name }</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              { data?.products && data.products.map(p =>
                <Box key={ p.id } sx={ {flexGrow: 1, py: 1} }>
                  <Grid container spacing={ 1 }>
                    <Grid item xs={ 2 }>
                      <img src={ p.imageUrl } title={ p.name }/>
                    </Grid>
                    <Grid item xs={ 7 }>
                      <Typography fontSize="large"><strong>{ p.name }</strong></Typography>
                      <Typography>{ p.description }</Typography>
                      <Typography>{ p.provider }</Typography>
                    </Grid>
                    <Grid item xs={ 2 }>
                      <Typography align="right" fontSize="large"><strong>{ p.regularPrice }</strong></Typography>
                    </Grid>
                    <Grid item xs={ 1 }></Grid>
                  </Grid>
                </Box>,
              ) }
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={ 4 }>
          <Box sx={ {
            flexGrow: 1, border: `1px solid ${ blueGrey[300] }`, p: 2, pb: 4, borderRadius: 2,
            position: "sticky", top: "8px",
          } }>
            <Typography variant="h5" sx={ {color: purple[800], pb: 2} }><strong>{ data?.name }</strong></Typography>
            <Box>
              <Grid container spacing={ 1 }>
                <Grid item xs={ 6 }>
                  <Typography>Items</Typography>
                </Grid>
                <Grid item xs={ 6 }>
                  <Typography align="right">{ totalProducts }</Typography>
                </Grid>
                <Grid item xs={ 6 }>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item xs={ 6 }>
                  <Typography variant="h6" align="right" sx={ {color: teal[700]} }><strong>${ totalPrice }</strong></Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )

}
