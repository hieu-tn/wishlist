import { useState } from "react"
import { Alert, AlertColor, Grow } from "@mui/material"

import { ToastProps } from "../../models/common/toast.models"


export default function Toast({action, type}: ToastProps) {
  const [open, setOpen] = useState(true)

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Grow in={ open }>
      <Alert onClose={ handleClose } severity={ type } sx={ {width: "100%"} }>
        { action } { type == "info" ? "loading" : type }
      </Alert>
    </Grow>
  )
}
