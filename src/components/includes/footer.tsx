import React from "react";
import {Container, Stack} from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Container fixed>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <p>Footer</p>
        </Stack>
      </Container>
    </footer>
  )
}
