import {Container, Grid, Stack} from '@mui/material';
import 'styles/routes/home.scss'

import SearchForm from "../components/forms/search";
import ProductItemComponent from "../components/common/product-item.component";
import {PROVIDERS} from "../constants/providers";

export default function HomeRoute() {
  let products = [
    {
      url: 'https://www.walmart.ca/en/ip/Dairyland-2-Partly-Skimmed-Milk/6000075688886',
      imageUrl: 'https://i5.walmartimages.com/asr/56c0f88b-1d6c-4180-a2bb-3b3fc364136f.7f17ce082a974d1d14b7aa334e7e7332.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff',
      name: 'Dairyland 2% Partly Skimmed Milk',
      description: '4 L',
      regularPrice: '$5.79',
      provider: PROVIDERS.WALMART,
    },
    {
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
              <Grid xs={3} key={p.name}>
                <ProductItemComponent data={p}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
    </>
  )
}
