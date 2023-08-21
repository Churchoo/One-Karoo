import { 
    Button, 
    CircularProgress, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    IconButton, 
    TextField, 
    Typography
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react'

interface productItem {
    productId: number,
    productDescription: string,
    productName: string,
    productPrice: number,
    productCategory: string,
    productWidth: number,
    productLength: number,
    productHeight: number
  }

  interface ShoppingCartItem {
    productId: number,
    productDescription: string,
    productName: string,
    productPrice: number,
    numProducts: number,
    productWidth: number,
    productLength: number,
    productHeight: number
  }
interface Props {
    isOpen: boolean,
    closeDialog: () => void,
    addDialog: (productItem: ShoppingCartItem) => void,
    productItem: productItem,
    productImage: string
}

  
const ProductInformation = (props: Props) => {
    const [numItems, setNumItems] = useState<number>(1)
    const [disabledBackButton, setDisabledBackButton] = useState<boolean>(false)

    useEffect(() => {/* eslint-disable-line */
        if(numItems===1){
            setDisabledBackButton(true)
        }
        else{
            setDisabledBackButton(false)
        }
    }),[numItems]
    try {
        

    return (
        <Dialog fullWidth open={props.isOpen} onClose={props.closeDialog}>
            <DialogTitle>{props.productItem.productName}</DialogTitle>
            <DialogContent>
                <div style={{}}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                        {props.productItem.productName}
                    </Typography>
                </div>
                <img src={props.productImage} alt={props.productItem.productName} style={{ height: 210, width: 210}}/>
                <br />
                {props.productItem.productDescription}
            </DialogContent>
            <DialogActions>
                <IconButton onClick={() => setNumItems(numItems-1)} aria-label='subtract one' disabled={disabledBackButton}>
                    <ArrowBackIosIcon />
                </IconButton>
                <TextField 
                required
                defaultValue={numItems}
                value={numItems}
                type='number'
                variant='standard'
                InputProps={{
                    sx: {
                        "& input": {
                            textAlign: "center",
                            
                        }
                    },
                    disableUnderline: true
                }}
                onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setNumItems(parseFloat(e.target.value))}
                sx={{width: 17,
                    height: 30, 
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                  },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },}}
                />
                <IconButton onClick={() => setNumItems(numItems+1)} aria-label='add one' >
                    <ArrowForwardIosIcon />
                </IconButton>
                <Button onClick={() =>props.addDialog({productId: props.productItem.productId, productDescription: props.productItem.productDescription, productName: props.productItem.productName, productPrice: props.productItem.productPrice, numProducts: numItems, productWidth: props.productItem.productWidth, productLength: props.productItem.productLength, productHeight: props.productItem.productHeight})} color="primary">
                    Add Item
                </Button>
                <Button onClick={props.closeDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
            {/* <Backdrop sx={{}} open={props.isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop> */}
        </Dialog>
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

export default ProductInformation