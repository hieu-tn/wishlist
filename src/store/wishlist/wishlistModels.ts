import { EntityState, PayloadAction } from "@reduxjs/toolkit"

import { IState } from "../models"
import { IProductItem } from "../../modules/home/models/product.model"


export interface IWishlistState extends IState, EntityState<IWishlist> {}

export interface IWishlist {
  id: string
  name: string
  items: EntityState<IProductItem>
}

export interface ISetWishlistsAction extends PayloadAction<Array<IWishlist>> {}

export interface ISetWishlistAction extends PayloadAction<IWishlist> {}
