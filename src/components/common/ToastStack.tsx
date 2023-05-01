import { Snackbar, Stack } from "@mui/material"
import Toast from "./Toast"


export default function ToastStack() {
  const toasts = [0, 1]

  return (
    <Snackbar open={ true }>
      <Stack direction="row" spacing={ 2 } useFlexGap flexWrap="wrap">
        { toasts && toasts.map(_ => (
          <Toast></Toast>
        )) }
      </Stack>
    </Snackbar>
  )
}
