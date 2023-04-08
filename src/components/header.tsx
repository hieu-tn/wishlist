import React from "react";
import {NavLink} from "react-router-dom";

export default function Header() {
  return (
    <header>
      <NavLink to={`/`}>home</NavLink>
      <NavLink to={`/wishlist`}>wishlist</NavLink>
    </header>
  )
}
