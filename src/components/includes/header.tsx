import React from "react"
import {NavLink} from "react-router-dom"
import styles from 'styles/components/includes/header.module.scss'

import {Button, Container, Divider, Stack} from "@mui/material"
import {IMenuItem} from "models/header.models"

export default function Header() {
  const menus: IMenuItem[] = [
    {to: '/', text: 'Home'},
    {to: '/wishlist', text: 'Wishlist'},
  ]

  return (
    <header className={styles.header}>
      <Container fixed>
        <nav>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem/>}
          >
            {menus && menus.map((m: IMenuItem) => (
              <NavLink to={m.to} key={m.text}>
                <Button variant="text">{m.text}</Button>
              </NavLink>
            ))}
          </Stack>
        </nav>
      </Container>
    </header>
  )
}
