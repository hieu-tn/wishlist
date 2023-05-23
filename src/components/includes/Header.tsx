import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "styles/components/includes/header.module.scss"
import { Badge, Button, Container, Divider, IconButton, Stack } from "@mui/material"
import { ShoppingCartOutlined, Cabin } from "@mui/icons-material"
import { pink } from "@mui/material/colors"

import { useAppDispatch, useAppSelector } from "../../store/hooks"
import * as WishlistActions from "store/wishlist/wishlistSlice"
import { increaseCounter } from "store/counter/counterSlice"


export default function Header() {
  const MAX_QTY = 10
  const [qty, setQty] = useState<number>(0)

  // @todo debug
  const counter = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  const handleOnClickEvent = () => {
    dispatch(increaseCounter(null))
  }

  const wishlists = useAppSelector(WishlistActions.selectAllWishlists)
  useEffect(() => {
    setQty(prevState => wishlists.reduce((accumulator, w) => accumulator + w.products.length, 0))
  }, [wishlists])

  return (
    <header className={ styles.header }>
      <button onClick={ handleOnClickEvent }>{ counter }</button>
      <Container>
        <nav>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={ 2 }
            divider={ <Divider orientation="vertical" flexItem/> }
          >
            <NavLink to="/">
              <IconButton><Cabin sx={ {color: pink[500]} }/></IconButton>
            </NavLink>
            <NavLink to="/wishlists">
              <IconButton>
                <Badge badgeContent={ qty } showZero max={ MAX_QTY } color="secondary">
                  <ShoppingCartOutlined color="action"/>
                </Badge>
              </IconButton>
            </NavLink>
          </Stack>
        </nav>
      </Container>
    </header>
  )
}
