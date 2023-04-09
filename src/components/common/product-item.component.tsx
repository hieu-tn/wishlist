import {IconButton, Link} from "@mui/material";
import styles from "styles/components/common/product-item.module.scss"

import {PROVIDERS} from "../../constants/providers";
import MapsUgcTwoToneIcon from '@mui/icons-material/MapsUgcTwoTone';

export type ProductItemProps = {
  data: IProductItem
}

export interface IProductItem {
  id: string,
  url: string,
  imageUrl: string
  name: string
  description?: string
  regularPrice: string
  provider: PROVIDERS
}

// @ts-ignore
export default function ProductItemComponent({data}: ProductItemProps) {



  return (
    <div className={styles.productItem}>
      <div className={styles.image}>
        <img
          src={`${data.imageUrl}`}
          srcSet={`${data.imageUrl}`}
          alt={data.name}
          loading="lazy"
        />
        <IconButton aria-label="add">
          <MapsUgcTwoToneIcon />
        </IconButton>
      </div>
      <div className={styles.content}>
        <p><Link href={data.url} underline="hover" target="_blank">{data.name}</Link></p>
        <p>{data.description}</p>
        <p>{data.regularPrice}</p>
        <p>{data.provider}</p>
      </div>
    </div>
  )
}
