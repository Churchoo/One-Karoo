import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface Props {
    productId: number,
    productDescription: string,
    productName: string,
    productPrice: number,
    ProductImage: string,
}

const styles = {
    media: {
        height: 194,
        paddingTop: '2.50%', // 16:9,
        paddingLeft: '5.00%',
        paddingRight: '5.00%',
        marginTop: '30'
    }
};

const ProductImage = (props: Props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                src={props.ProductImage}
                alt={props.productName}
                style={styles.media}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.productDescription}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ProductImage