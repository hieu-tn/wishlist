import { ReactElement, useState } from "react"
import { Alert, Grow } from "@mui/material"

import { ToastProps } from "../../models/common/toast.models"


export default function Toast({action, type}: ToastProps) {
  const [open, setOpen] = useState(true)

  const displayAlert = () => {

  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Grow in={ open }>
      {
        (type && type === "success" &&
          <Alert onClose={ handleClose } severity={ type } sx={ {width: "100%"} }>
            { action } success
          </Alert>
        )
        ||
        (type && type === "error" &&
          <Alert onClose={ handleClose } severity={ type } sx={ {width: "100%"} }>
            { action } error
          </Alert>
        )
        ||
        <Alert onClose={ handleClose } severity={ type } sx={ {width: "100%"} }>
          { action } loading
        </Alert>
      }
    </Grow>
  )
}
