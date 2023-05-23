import { SyntheticEvent, useEffect, useState } from "react"
import { Box, Checkbox, ClickAwayListener, FormControlLabel, IconButton, Link, Popover, Popper, styled, Typography } from "@mui/material"
import LoopIcon from "@mui/icons-material/Loop"

import styles from "styles/modules/home/components/product-item.module.scss"
import { ProductItemProps, ToggleProductActions } from "modules/home/models/product.model"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import * as crawlerActions from "store/crawler/crawlerSlice"
import * as wishlistActions from "store/wishlist/wishlistSlice"
import { blue, grey } from "@mui/material/colors"


export default function ProductItem({data}: ProductItemProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>()
  const dispatch = useAppDispatch()
  const open = Boolean(anchorEl)
  const providers = useAppSelector(crawlerActions.selectAllProviders)
  const wishlists = useAppSelector(wishlistActions.selectWishlistEntities)

  const providerName = (code: string): string => {
    try {
      let provider = providers.filter(p => p.code === code).pop()
      return provider ? provider?.name : code
    } catch (e) {
      return code
    }
  }

  const shopClickEventHandler = (e: SyntheticEvent) => setAnchorEl(e.currentTarget)

  const toggleShopProductEventHandler = (checked: boolean, wishlistId: string = "") => {
    let action = checked ? ToggleProductActions.ADD : ToggleProductActions.REMOVE
    toggleProductToWishlist(wishlistId, action)
  }

  const toggleProductToWishlist = (wishlistId: string, action: ToggleProductActions) => {
    if (action === ToggleProductActions.ADD) {
      dispatch(wishlistActions.addProductToWishlist({wishlistId, product: data}))
    } else {
      dispatch(wishlistActions.removeProductFromWishlist({wishlistId, productId: data.id}))
    }
  }

  const handleClose = () => setAnchorEl(null)

  const isProductInWishlist = (key: string): boolean => {
    return wishlists[key]?.products.includes(data.id) || false
  }

  const styleShopContainer = {
    px: 3, py: 1 / 2, color: grey[900], background: "#fff",
    boxShadow: `0px 2px 24px ${ blue[100] }`,
    "&:hover": {
      borderColor: blue[400],
    },
    "&:focus": {
      borderColor: blue[400],
      boxShadow: `0 0 0 3px ${ blue[200] }`,
    },
  }

  return (
    <Box className={ styles.productItem }>
      <Box className={ styles.imageContainer }>
        <img
          src={ `${ data.imageUrl }` }
          srcSet={ `${ data.imageUrl }` }
          alt={ data.name }
          loading="lazy"
        />
        <IconButton aria-label="add" className={ styles.btnShop } onClick={ shopClickEventHandler }>
          <LoopIcon color="secondary"/>
        </IconButton>
        <Popper
          open={ open }
          anchorEl={ anchorEl }
          placement="bottom-start"
          disablePortal={ false }
          modifiers={ [
            {
              name: "flip",
              enabled: false,
            },
          ] }
        >
          <ClickAwayListener onClickAway={ handleClose }>
            <Box className={ styles.shopContainer } sx={ styleShopContainer }>
              { wishlists && Object.entries(wishlists).map(([key, wishlist]) =>
                <Box key={ wishlist?.id }>
                  <FormControlLabel
                    control={ <Checkbox/> }
                    label={ wishlist?.name }
                    checked={ isProductInWishlist(key) }
                    onChange={ (e, checked) => toggleShopProductEventHandler(checked, wishlist?.id) }/>
                </Box>,
              ) }
            </Box>
          </ClickAwayListener>
        </Popper>
      </Box>
      <Box className={ styles.content }>
        <Typography><Link href={ data.url } underline="hover" target="_blank" rel="noreferrer">{ data.name }</Link></Typography>
        <Typography>{ data.description }</Typography>
        <Typography><strong>{ data.regularPrice }</strong></Typography>
        <Typography data-code={ data.provider }>{ providerName(data.provider) }</Typography>
      </Box>
    </Box>
  )
}
