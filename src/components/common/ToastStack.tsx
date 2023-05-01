import { useState } from "react"
import { AlertColor, Box, Snackbar, Stack } from "@mui/material"

import Toast from "./Toast"
import { useAppSelector } from "../../store/hooks"
import { selectLatestToastsErrors, selectLatestToastsLoadings, selectLatestToastsSuccesses } from "../../store/toasts/toastsSlice"
import { IActionError, IActionLoading, IActionSuccess } from "../../store/toasts/toastsModels"
import { IToastMessage } from "../../models/common/toast.models"


export default function ToastStack() {
  const [messages, setMessages] = useState<Array<IToastMessage>>([])

  const addMessageToQueue = (msg: IActionLoading | IActionSuccess | IActionError | undefined, type: AlertColor): void => {
    if (!msg) return

    let seen = messages.find(m => m.action == msg.action && m.type == type)
    if (seen) return

    setMessages([...messages, {action: msg.action, type}])
  }

  addMessageToQueue(useAppSelector(selectLatestToastsLoadings), "info")
  addMessageToQueue(useAppSelector(selectLatestToastsSuccesses), "success")
  addMessageToQueue(useAppSelector(selectLatestToastsErrors), "error")

  return (
    <Snackbar open={ true }>
      <Box>
        <Stack direction={ "row" } spacing={ 2 } useFlexGap flexWrap="wrap">
          { messages && messages.map(msg => (
            <Toast action={ msg.action } type={ msg.type } key={ msg.action + msg.type }/>
          )) }
        </Stack>
      </Box>
    </Snackbar>
  )
}
