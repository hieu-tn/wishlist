import React from "react";
import {NavLink} from "react-router-dom";

import {Button, Container, Divider, Stack} from "@mui/material"

export default function Header() {
  return (
    <header>
      <Container fixed>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <NavLink to={`/`}>
            <Button variant="text" color="primary">Home</Button>
          </NavLink>
          <Divider orientation="vertical" flexItem />
          <NavLink to={`/wishlist`}>
            <Button variant="text" color="secondary">Wishlist</Button>
          </NavLink>
        </Stack>
      </Container>
    </header>
  )
}
