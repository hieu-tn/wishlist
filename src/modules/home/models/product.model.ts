import { IMatch } from "../../../store/crawler/crawlerModels"


export type ProductItemProps = {
  data: IProductItem
}

export interface IProductItem extends IMatch {}

export enum ToggleProductActions {
  ADD = "add",
  REMOVE = "remove",
}
