import { AlertColor } from "@mui/material"


export type ToastProps = {
  id: string
  action: string
  type: AlertColor | undefined
  removeMessage: any
}

export interface IToastMessage {
  id: string
  action: string
  type: AlertColor
}
