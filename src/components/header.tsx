import React from "react";
import {NavLink} from "react-router-dom";

import Button from '@mui/material/Button'

export default function Header() {
  return (
    <header>
      <NavLink to={`/`}>home</NavLink>
      <NavLink to={`/wishlist`}>wishlist</NavLink>
      <Button variant="contained">Hello World</Button>
    </header>
  )
}
