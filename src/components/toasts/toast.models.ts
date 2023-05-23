import { ToastItemType } from "../../store/toasts/toastsModels"


export type ToastProps = {
  id: string
  action: string
  type: ToastItemType
  expiresAt: string
  removeMessage: any
}

export interface IToastMessage {
  id: string
  action: string
  type: ToastItemType
  expiresAt: string
}

export enum ToastActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

export interface IToastQueue {
  type: ToastActionType
  message: IToastMessage
}
