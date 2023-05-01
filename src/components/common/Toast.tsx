import { useState } from "react"
import { Alert } from "@mui/material"


export default function Toast() {
  const [open, setOpen] = useState(true)

  const handleClose = (idx: number): void => {
    setOpen(false)
  }

  return (
    <Alert onClose={ () => handleClose(1) } severity="success" sx={ {width: "100%"} }>
      This is a success message!
    </Alert>
  )
}
