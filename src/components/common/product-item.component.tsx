import {Link} from "@mui/material";
import styles from "styles/components/common/product-item.module.scss"

import {PROVIDERS} from "../../constants/providers";

export type ProductItemProps = {
  data: IProductItem
}

export interface IProductItem {
  url: string,
  imageUrl: string
  name: string
  description?: string
  regularPrice: string
  provider: PROVIDERS
}

// @ts-ignore
export default function ProductItemComponent({data}: ProductItemProps) {
  console.log(data)
  return (
    <div className={styles.productItem}>
      <div className={styles.image}>
        <img
          src={`${data.imageUrl}`}
          srcSet={`${data.imageUrl}`}
          alt={data.name}
          loading="lazy"
        />
      </div>
      <div>
        <p><Link href={data.url} target="_blank">{data.name}</Link></p>
        <p>{data.description}</p>
        <p>{data.regularPrice}</p>
        <p>{data.provider}</p>
      </div>
    </div>
  )
}
