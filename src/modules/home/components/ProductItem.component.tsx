import { IconButton, Link } from "@mui/material"
import styles from "styles/modules/home/components/product-item.module.scss"

import MapsUgcTwoToneIcon from "@mui/icons-material/MapsUgcTwoTone"
import { ProductItemProps } from "modules/home/models/product.model"


export default function ProductItemComponent({data}: ProductItemProps) {
  console.log(data)
  return (
    <div className={ styles.productItem }>
      <div className={ styles.image }>
        <img
          src={ `${ data.imageUrl }` }
          srcSet={ `${ data.imageUrl }` }
          alt={ data.name }
          loading="lazy"
        />
        <IconButton aria-label="add">
          <MapsUgcTwoToneIcon/>
        </IconButton>
      </div>
      <div className={ styles.content }>
        <p><Link href={ data.url } underline="hover" target="_blank">{ data.name }</Link></p>
        <p>{ data.description }</p>
        <p>{ data.regularPrice }</p>
        <p>{ data.provider }</p>
      </div>
    </div>
  )
}
