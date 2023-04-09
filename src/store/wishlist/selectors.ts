import { createSelector } from "@reduxjs/toolkit"

const selectWishlistState = (state: { wishlist: any }) => state.wishlist

export const selectWishlist = createSelector(
  [selectWishlistState],
  (wishlist) => {
    return wishlist
  }
)
