import {Container, Grid, Stack} from '@mui/material';
import 'styles/routes/home.scss'

import SearchForm from "../components/forms/search";
import ProductItemComponent, {IProductItem} from "../components/common/product-item.component";
import {PROVIDERS} from "../constants/providers";
import {useDispatch, useSelector} from "react-redux";
import {selectWishlist} from "../store/wishlist/selectors";


export default function HomeRoute() {
  const todos = useSelector(selectWishlist)
  console.log(todos)
  const dispatch = useDispatch()
  if (todos.length == 0) {
    dispatch({
      type: 'wishlist/addItem', payload: {
        url: 'https://www.walmart.ca/en/ip/Dairyland-2-Partly-Skimmed-Milk/6000075688886',
        imageUrl: 'https://assets.shop.loblaws.ca/products/21128369/b1/en/front/21128369_front_a01.png',
        name: 'Fairlife Lactose Free 2% Partly Skimmed Ultrafiltered Milk',
        description: '',
        regularPrice: '$6.19',
        provider: PROVIDERS.CANADIAN_SUPERSTORE,
      }
    })
  }

  let products = [
    {
      id: '1',
      url: 'https://www.walmart.ca/en/ip/Dairyland-2-Partly-Skimmed-Milk/6000075688886',
      imageUrl: 'https://i5.walmartimages.com/asr/56c0f88b-1d6c-4180-a2bb-3b3fc364136f.7f17ce082a974d1d14b7aa334e7e7332.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff',
      name: 'Dairyland 2% Partly Skimmed Milk',
      description: '4 L',
      regularPrice: '$5.79',
      provider: PROVIDERS.WALMART,
    },
    {
      id: '2',
      url: 'https://www.walmart.ca/en/ip/Dairyland-2-Partly-Skimmed-Milk/6000075688886',
      imageUrl: 'https://assets.shop.loblaws.ca/products/21128369/b1/en/front/21128369_front_a01.png',
      name: 'Fairlife Lactose Free 2% Partly Skimmed Ultrafiltered Milk',
      description: '',
      regularPrice: '$6.19',
      provider: PROVIDERS.CANADIAN_SUPERSTORE,
    }
  ]
  return (
    <>
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <SearchForm/>
        </Stack>
      </Container>

      <section className="results">
        <Container>
          <Grid container columnSpacing={2}>
            {products && products.map(p => (
              <Grid xs={3} item={true} key={p.name}>
                <ProductItemComponent data={p}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
    </>
  )
}
function selectWisthlist(state: unknown): unknown {
    throw new Error('Function not implemented.');
}

