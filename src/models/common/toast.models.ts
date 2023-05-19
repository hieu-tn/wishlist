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
