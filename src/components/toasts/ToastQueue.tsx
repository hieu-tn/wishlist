import { useState } from "react"
import { Box, Snackbar, Stack } from "@mui/material"

import Toast from "./Toast"
import { useAppSelector } from "../../store/hooks"
import { IToastMessage } from "../../models/toasts/toast.models"
import { selectAllToasts } from "store/toasts/toastsSlice"
import { IToastItem } from "../../store/toasts/toastsModels"


export default function ToastQueue() {
  const MAX_MESSAGE_QUEUE = 3
  const [messages, setMessages] = useState<{ [key: string]: IToastMessage }>({})

  const addMessage = (msg: Array<IToastItem>): void => {
    if (!msg.length) return

    const item: IToastItem = msg[msg.length - 1]
    if (item.id in messages) return

    let tmpMessages = {
      ...messages,
      [item?.id]: {id: item.id, action: item.name, type: item.type, expiresAt: (Date.now() + 4000).toString()},
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

  addMessage(useAppSelector(selectAllToasts))

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
