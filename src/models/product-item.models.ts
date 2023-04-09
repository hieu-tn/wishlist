import {PROVIDERS} from "constants/providers"

export type ProductItemProps = {
  data: IProductItem
}

export interface IProductItem {
  id: string,
  url: string,
  imageUrl: string
  name: string
  description?: string
  regularPrice: string
  provider: PROVIDERS
}
