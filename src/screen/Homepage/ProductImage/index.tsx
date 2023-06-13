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
        height: 210,
        width: 210,
        paddingTop: '5.00%', // 16:9,
        paddingLeft: '5.00%',
        paddingRight: '5.00%',
        marginTop: '30'
    }
};

const ProductImage = (props: Props) => {
    const Capitalize =(string:string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Card sx={{ width: 240, height: 350 }} >
            <Typography variant="h4" color="text.secondary">
                &nbsp;{Capitalize(props.productName)}
            </Typography>
            <CardMedia
                component="img"
                src={Capitalize(props.ProductImage)}
                alt={props.productName}
                style={styles.media}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {Capitalize(props.productDescription)}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ProductImage