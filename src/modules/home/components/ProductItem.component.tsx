import { SyntheticEvent, useState } from "react"
import { Box, Checkbox, FormControlLabel, IconButton, Link, Popover } from "@mui/material"
import LoopIcon from "@mui/icons-material/Loop"

import styles from "styles/modules/home/components/product-item.module.scss"
import { ProductItemProps, ToggleProductActions } from "modules/home/models/product.model"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import * as crawlerActions from "store/crawler/crawlerSlice"
import * as wishlistActions from "store/wishlist/wishlistSlice"


export default function ProductItemComponent({data}: ProductItemProps) {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const open = Boolean(anchorEl)

  const dispatch = useAppDispatch()
  const providers = useAppSelector(crawlerActions.selectAllProviders)
  const wishlists = useAppSelector(wishlistActions.selectAllWishlists)

  const providerName = (code: string): string => {
    try {
      let provider = providers.filter(p => p.code === code).pop()
      return provider ? provider?.name : code
    } catch (e) {
      return code
    }
  }

  const shopClickEventHandler = (e: SyntheticEvent) => setAnchorEl(e.currentTarget)

  const toggleShopProductEventHandler = (checked: boolean, wishlistId: string) => {
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

  return (
    <div className={ styles.productItem }>
      <div className={ styles.productItemInner }>
        <div className={ styles.imageContainer }>
          <img
            src={ `${ data.imageUrl }` }
            srcSet={ `${ data.imageUrl }` }
            alt={ data.name }
            loading="lazy"
          />
          <IconButton aria-label="add" className={ styles.btnShop } onClick={ shopClickEventHandler }>
            <LoopIcon color="secondary"/>
          </IconButton>
          <Popover
            open={ open }
            anchorEl={ anchorEl }
            onClose={ handleClose }
            anchorOrigin={ {
              vertical: "bottom",
              horizontal: "left",
            } }
          >
            <Box sx={ {px: 3, py: 1 / 2} }>
              { wishlists && wishlists.map(w =>
                <Box key={ w.id }>
                  <FormControlLabel
                    control={ <Checkbox/> }
                    label={ w.name }
                    onChange={ (e, checked) => toggleShopProductEventHandler(checked, w.id) }/>
                </Box>,
              ) }
            </Box>
          </Popover>
        </div>
        <div className={ styles.content }>
          <p><Link href={ data.url } underline="hover" target="_blank" rel="noreferrer">{ data.name }</Link></p>
          <p>{ data.description }</p>
          <p><strong>{ data.regularPrice }</strong></p>
          <p data-code={ data.provider }>{ providerName(data.provider) }</p>
        </div>
      </div>
    </div>
  )
}
