import { useEffect, useState } from "react"
import { Alert, AlertColor, Grow } from "@mui/material"

import { ToastProps } from "../../models/common/toast.models"
import { CrawlerActionToastMessages } from "../../store/crawler/crawlerActions"
import { ToastItemType } from "../../store/toasts/toastsModels"
import { WishlistActionToastMessages } from "../../store/wishlist/wishlistActions"


export default function Toast({id, action, type, expiresAt, removeMessage}: ToastProps) {
  const [open, setOpen] = useState<boolean>(true)
  const [message, setMessage] = useState<string>("")
  const [alertType, setAlertType] = useState<AlertColor>("info")

  useEffect(() => {
    const messages: { [key: string]: { [key: string]: string } } = {
      ...CrawlerActionToastMessages,
      ...WishlistActionToastMessages,
    }
    let text = `${ action } ${ type }`
    try {
      text = messages[action][type]
    } catch (e) {}
    setMessage(text)
  }, [action])

  useEffect(() => {
    switch (type) {
      case ToastItemType.SUCCESS:
        setAlertType("success")
        break
      case ToastItemType.ERROR:
        setAlertType("error")
        break
      default:
        setAlertType("info")
        break
    }
  }, [type])

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
      <Alert onClose={ handleClose } severity={ alertType } sx={ {width: "100%"} }>
        { message }
      </Alert>
    </Grow>
  )
}
