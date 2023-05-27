import { EntityState, PayloadAction } from "@reduxjs/toolkit"

import { IState } from "../models"
import { IProductItem } from "../../modules/home/models/product.model"


export interface IWishlistState extends IState, EntityState<IWishlist> {}

export interface IWishlist {
  id: string
  name: string
  products: Array<IProductItem>
}

export interface ISetWishlistsAction extends PayloadAction<Array<IWishlist>> {}

export interface ISetWishlistAction extends PayloadAction<IWishlist> {}

export interface IAddProductAction extends PayloadAction<IProductItem> {}

export interface IAddProductToWishlist {
  wishlistId: string
  product: IProductItem
}

export interface IAddProductToWishlistAction extends PayloadAction<IAddProductToWishlist> {}

export interface IRemoveProductAction extends PayloadAction<string> {}

export interface IRemoveProductFromWishlist {
  wishlistId: string
  productId: string
}

export interface IRemoveProductFromWishlistAction extends PayloadAction<IRemoveProductFromWishlist> {}
