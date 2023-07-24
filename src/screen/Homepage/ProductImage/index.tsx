import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface productItem {
    productId: number,
    productDescription: string,
    productName: string,
    productPrice: number,
  }

interface Props {
    productItem: productItem,
    productImage: string,
    openProductDialog: (productIndex: number) => void,
    productIndex: number,
}

const styles = {
    media: {
        height: 210,
        width: 210,
        paddingTop: '5.00%', // 16:9,
        paddingLeft: '5.00%',
        paddingRight: '5.00%',
        marginTop: '30'
    }
};

const ProductImage = (props: Props) => {
    const Capitalize = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    try {


        return (
            <Card sx={{ width: 240, height: 380 }} >
                <Typography variant="h4" color="text.secondary">
                    &nbsp;{Capitalize(props.productItem.productName)}
                </Typography>
                <CardMedia
                    onClick={() => { 
                        props.openProductDialog(props.productIndex)}}
                    component="img"
                    src={props.productImage}
                    alt={props.productItem.productName}
                    style={styles.media}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {Capitalize(props.productItem.productDescription)}
                    </Typography>
                </CardContent>
            </Card>
        )
    } catch (error) {
        console.log(error)
        return (
            <div>
                hello
            </div>
        )
    }
}

export default ProductImage