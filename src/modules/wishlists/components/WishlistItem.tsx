import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { blueGrey, purple, teal } from "@mui/material/colors"
import { WishlistItemProps } from "../models/wishlist.model"
import { useAppSelector } from "../../../store/hooks"
import * as wishlistActions from "store/wishlist/wishlistSlice"


export default function WishlistItem({id}: WishlistItemProps) {
  const data = useAppSelector(state => wishlistActions.selectWishlistById(state, id))
  console.log(data)
  
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
              <p>p</p>
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
