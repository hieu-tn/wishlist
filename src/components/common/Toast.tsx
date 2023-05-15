import { useEffect, useState } from "react"
import { Alert, Grow } from "@mui/material"

import { ToastProps } from "../../models/common/toast.models"


export default function Toast({id, action, type, removeMessage}: ToastProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setOpen(false)
      }, 4000)
      return () => clearTimeout(timeout)
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
      <Alert onClose={ handleClose } severity={ type } sx={ {width: "100%"} }>
        { action } { type == "info" ? "loading" : type }
      </Alert>
    </Grow>
  )
}
