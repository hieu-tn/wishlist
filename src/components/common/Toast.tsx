import { useState } from "react"
import { Alert, Grow } from "@mui/material"


export default function Toast() {
  const [open, setOpen] = useState(true)

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Grow in={ open }>
      <Alert onClose={ handleClose } severity="success" sx={ {width: "100%"} }>
        This is a success message!
      </Alert>
    </Grow>
  )
}
