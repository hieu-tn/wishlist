import { EntityState } from "@reduxjs/toolkit"


export interface IToastsState extends EntityState<IToastItem> {}

export enum ToastItemType {
  INFO = "info",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface IToastItem {
  id: string
  name: string
  type: ToastItemType
  message: any
}
