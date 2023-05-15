import { useEffect, useState } from "react"
import { Alert, Grow } from "@mui/material"

import { ToastProps } from "../../models/common/toast.models"


export default function Toast({id, action, type, expiresAt, removeMessage}: ToastProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        if (Date.now() >= parseInt(expiresAt)) {
          setOpen(false)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  })

  useEffect(() => {
    if (!open) {
      removeMessage(id)
    }
  }, [open])

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Grow in={ open } data-id={ id }>
      <Alert onClose={ handleClose } severity={ type || "info" } sx={ {width: "100%"} }>
        { action } { type == "info" ? "loading" : type }
      </Alert>
    </Grow>
  )
}
