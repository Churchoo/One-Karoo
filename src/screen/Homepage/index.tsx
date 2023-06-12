import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { NetworkState } from '../../constants/networkState'
import { fetchProducts } from '../../redux/slices/ProductsSlice'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Image1 from '../../images/Image1.jpg'
import Image2 from '../../images/Image2.jpg'
import Image3 from '../../images/Image3.jpg'
import Image4 from '../../images/Image4.jpg'
import Image5 from '../../images/Image5.jpg'
import Image6 from '../../images/Image6.jpg'
import Image7 from '../../images/Image7.jpg'
import Image8 from '../../images/Image8.jpg'
import Image9 from '../../images/Image9.jpg'
import Image10 from '../../images/Image10.jpg'
import ProductImage from './ProductImage'
import { Padding } from '@mui/icons-material'

interface Props {
  product: any
}

const images: { image: any }[] = [{ image: Image1 }, { image: Image2 }, { image: Image3 }, { image: Image4 },
{ image: Image5 }, { image: Image6 }, { image: Image7 }, { image: Image8 }, { image: Image9 },
{ image: Image10 }]

const styles = {
  media: {
    height: 194,
    paddingTop: '2.50%', // 16:9,
    paddingLeft: '5.00%',
    paddingRight: '5.00%',
    marginTop: '30'
  }
};

const Homepage = (props: Props) => {
  const dispatch = useAppDispatch()

  const { productsNetworkStatus } = useAppSelector((state) => state.products)
  const { products } = useAppSelector((state) => state.products)
  console.log(products)
  useEffect(() => {
    if (productsNetworkStatus.products === NetworkState.NOT_STARTED) {
      dispatch(fetchProducts())
    }
  }, [
    dispatch,
  ])
  console.log(products.length)
  if (productsNetworkStatus.products === NetworkState.SUCCESS) {
    return (
      <div>
          <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
            {products.map((value, index) => (
              <ProductImage
                productId={value.id}
                productName={value.productName}
                productDescription={value.productDescription}
                productPrice={value.productPrice}
                ProductImage={images[index].image}
              />
            ))}
          </Grid>
      </div>
    )
  }
  return (
    <div>
      <Typography variant="h4" component="h2">
        This is the {props.product}
      </Typography>
      <Grid >

      </Grid>
    </div>
  )
}

export default Homepage