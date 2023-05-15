import { useState } from "react"
import { AlertColor, Box, Snackbar, Stack } from "@mui/material"

import Toast from "./Toast"
import { useAppSelector } from "../../store/hooks"
import { selectLatestToastsErrors, selectLatestToastsLoadings, selectLatestToastsSuccesses } from "../../store/toasts/toastsSlice"
import { IActionError, IActionLoading, IActionSuccess } from "../../store/toasts/toastsModels"
import { IToastMessage } from "../../models/common/toast.models"


export default function ToastQueue() {
  const MAX_MESSAGE_QUEUE = 3
  const [messages, setMessages] = useState<{ [key: string]: IToastMessage }>({})

  const addMessage = (msg: IActionLoading | IActionSuccess | IActionError | undefined, type: AlertColor): void => {
    if (!msg) return

    if (msg.id in messages) return

    let tmpMessages = {
      ...messages,
      [msg.id]: {id: msg.id, action: msg.action, type, expiresAt: (Date.now() + 4000).toString()},
    }
    let keys = Object.keys(tmpMessages)
    if (keys.length > MAX_MESSAGE_QUEUE) {
      delete tmpMessages[keys[0]]
    }
    setMessages(prevState => tmpMessages)
  }

  const removeMessage = (id: string) => {
    setMessages(prevState => {
      delete prevState[id]
      return prevState
    })
  }

  addMessage(useAppSelector(selectLatestToastsLoadings), "info")
  addMessage(useAppSelector(selectLatestToastsSuccesses), "success")
  addMessage(useAppSelector(selectLatestToastsErrors), "error")

  return (
    <>
      <Snackbar open={ true }>
        <Box sx={ {width: 450} }>
          <Stack direction={ "row" } spacing={ 2 } useFlexGap flexWrap="wrap">
            { messages && Object.values(messages).map(msg => (
              <Toast key={ msg.id }
                     id={ msg.id }
                     action={ msg.action }
                     type={ msg.type }
                     expiresAt={ msg.expiresAt }
                     removeMessage={ removeMessage }/>
            )) }
          </Stack>
        </Box>
      </Snackbar>
    </>
  )
}
