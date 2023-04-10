import React from "react"
import { Container, Stack } from "@mui/material"


export default function Footer() {
  return (
    <footer>
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={ 2 }
        >
          <p>Hieu Tran</p>
        </Stack>
      </Container>
    </footer>
  )
}
