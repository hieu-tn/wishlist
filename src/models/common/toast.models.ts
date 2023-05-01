import { AlertColor } from "@mui/material"


export type ToastProps = {
  action: string
  type: AlertColor | undefined
}

export interface IToastMessage {
  action: string
  type: AlertColor
}
