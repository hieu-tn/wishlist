import { AlertColor } from "@mui/material"


export type ToastProps = {
  id: string
  action: string
  type: AlertColor | undefined
  expiresAt: string
  removeMessage: any
}

export interface IToastMessage {
  id: string
  action: string
  type: AlertColor
  expiresAt: string
}
