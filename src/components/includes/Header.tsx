import React from "react"
import { NavLink } from "react-router-dom"
import styles from "styles/components/includes/header.module.scss"

import { Button, Container, Divider, Stack } from "@mui/material"
import { IMenuItem } from "models/includes/header.models"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { increaseCounter } from "store/counter/counterSlice"


export default function Header() {
  const menus: IMenuItem[] = [
    {to: "/", text: "Home"},
    {to: "/wishlist", text: "Wishlist"},
  ]

  // @todo debug
  const counter = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  const handleOnClickEvent = () => {
    dispatch(increaseCounter(null))
  }

  return (
    <header className={ styles.header }>
      <button onClick={handleOnClickEvent}>{ counter }</button>
      <Container>
        <nav>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={ 2 }
            divider={ <Divider orientation="vertical" flexItem/> }
          >
            { menus && menus.map((m: IMenuItem) => (
              <NavLink to={ m.to } key={ m.text }>
                <Button variant="text">{ m.text }</Button>
              </NavLink>
            )) }
          </Stack>
        </nav>
      </Container>
    </header>
  )
}
