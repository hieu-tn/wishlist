import { Container } from "@mui/material"

import WishlistItem from "./WishlistItem"
import { useAppSelector } from "../../../store/hooks"
import * as wishlistActions from "../../../store/wishlist/wishlistSlice"


export default function WishlistList() {
  const wishlists = useAppSelector(wishlistActions.selectAllWishlists)

  return (
    <Container>
      { wishlists && wishlists.map(w => (
        <WishlistItem id={ w.id }/>
      )) }
    </Container>
  )
}
