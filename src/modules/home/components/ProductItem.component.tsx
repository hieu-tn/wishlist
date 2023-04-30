import { IconButton, Link } from "@mui/material"
import styles from "styles/modules/home/components/product-item.module.scss"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"

import { IProductItem, ProductItemProps } from "modules/home/models/product.model"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { selectAllProviders } from "store/crawler/crawlerSlice"
import * as wishlistActions from "store/wishlist/wishlistSlice"


export default function ProductItemComponent({data}: ProductItemProps) {
  const dispatch = useAppDispatch()
  const providers = useAppSelector(selectAllProviders)

  const providerName = (code: string): string => {
    try {
      let provider = providers.filter(p => p.code === code).pop()
      return provider ? provider?.name : code
    } catch (e) {
      return code
    }
  }

  const removeProductFromWishlist = (productId: string): void => {
    let wishlistId = "1"
    dispatch(wishlistActions.removeProductFromWishlist({wishlistId, productId}))
  }

  const addProductToWishlist = (product: IProductItem): void => {
    let wishlistId = "1"
    dispatch(wishlistActions.addProductToWishlist({wishlistId, product}))
  }

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
          <IconButton aria-label="remove" className={ styles.btnRemove } onClick={ () => removeProductFromWishlist(data.id) }>
            <RemoveCircleIcon color="error" fontSize="large"/>
          </IconButton>
          <IconButton aria-label="add" className={ styles.btnAdd } onClick={ () => addProductToWishlist(data) }>
            <AddCircleIcon color="success" fontSize="large"/>
          </IconButton>
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
