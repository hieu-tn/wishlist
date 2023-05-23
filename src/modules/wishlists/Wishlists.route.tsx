import "styles/modules/wishlist/wishlist.route.scss"
import { useGetProvidersQuery } from "../../store/crawler/crawlerSlice"
import { useGetWishlistsQuery } from "store/wishlist/wishlistSlice"
import WishlistList from "./components/WishlistList"


export default function WishlistsRoute() {
  useGetProvidersQuery(null)
  useGetWishlistsQuery(null)

  return (
    <>
      <WishlistList/>
    </>
  )
}
