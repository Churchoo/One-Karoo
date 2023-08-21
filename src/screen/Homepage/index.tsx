import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { NetworkState } from '../../constants/networkState'
import { fetchProducts, updateFilter, updateFilteredCatagories } from '../../redux/slices/ProductsSlice'
import { Autocomplete, Button, FormControl, Grid, InputAdornment, Menu, MenuItem, TextField, Typography, styled } from '@mui/material'
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
import ProductInformation from './ProductInformation'
import { addToShppingCart, goToCart } from '../../redux/slices/ShoppingCartSlice'
import { Search } from '@mui/icons-material'
import { fetchBox } from '../../redux/slices/BoxSlice'

interface Props {
  displayShoppingCart: () => void
  aboutUs: () => void
  displayFilterPage: () => void
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

interface Products {
  productId: number,
  productName: string,
  productDescription: string,
  productPrice: number,
  productCategory: string,
  productWidth: number,
  productLength: number,
  productHeight: number
}

const images: { image: any }[] = [{ image: Image1 }, { image: Image2 }, { image: Image3 }, { image: Image4 },
{ image: Image5 }, { image: Image6 }, { image: Image7 }, { image: Image8 }, { image: Image9 },
{ image: Image10 }]


const Homepage = (props: Props) => {
  const dispatch = useAppDispatch()

  const [anchorCatagories, setAnchorCatagories] = React.useState<null | HTMLElement>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [productID, setProductID] = useState(0)
  const { productsNetworkStatus } = useAppSelector((state) => state.products)
  const { boxNetworkStatus } = useAppSelector((state) => state.boxs)
  const { products } = useAppSelector((state) => state.products)
  const [isMouseDownLong, setIsMouseDownLong] = useState(false);
  const [filterItems, setFilterItems] = useState<string>("");
  const [openFilter, setOpenFilter] = useState(false)
  const [viewCatagories, setViewCatagories] = useState(false)
  const box = useAppSelector((state) => state.boxs.box)

  const productCatagories = () => {
    let uniques: Products[] = []
    products.forEach((value) => {
      if (!uniques.find((findValue) => findValue.productCategory === value.productCategory)) {
        uniques.push(value)
      }
    })
    return uniques
  }

  useEffect(() => {
    if (productsNetworkStatus.products === NetworkState.NOT_STARTED && boxNetworkStatus.getBox === NetworkState.NOT_STARTED) {
      dispatch(fetchProducts())
      dispatch(fetchBox())
    }
  }, [
    dispatch,
  ])

  const addItemToCart = (item: ShoppingCartItem) => {
    dispatch(addToShppingCart(item))
  }

  const handleProductDialog = () => {
    setProductDialogOpen(!productDialogOpen)
  }

  const handleproductID = (productId: number) => {
    setProductID(productId)
  }

  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0
  });

  useEffect(() => {
    if (!isMouseDownLong) {
      document.body.style.cursor = "default"
    }
  }, [
    isMouseDownLong
  ])

  const ourRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (e: any) => {
    if (!ourRef.current) return
    e.preventDefault();
    var mouseTimeout: any;
    const myElement = document.getElementById('Grid1') as HTMLElement;
    myElement.addEventListener("mousedown", function () {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(function () {
        document.body.style.cursor = "grabbing"
        setIsMouseDownLong(true)
      }, 50);
    }, false);
    const startX = e.pageX - myElement.offsetLeft;
    const startY = e.pageY - myElement.offsetTop;
    const scrollLeft = myElement.scrollLeft;
    const scrollTop = myElement.scrollTop;
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
  }
  const handleDragEnd = () => {
    const myElement = document.getElementById('Grid1') as HTMLElement;
    myElement.addEventListener("mouseup", function () {
      setIsMouseDownLong(false)
      document.body.style.cursor = "default"
    }, false);
    document.body.style.cursor = "default"
  }
  const handleDrag = (e: any) => {
    if (!isMouseDownLong || !ourRef.current) {
      return;
    }
    else {
      e.preventDefault();
      const myElement = document.getElementById('Grid1') as HTMLElement;
      const x = e.pageX - myElement.offsetLeft;
      const y = e.pageY - myElement.offsetTop;
      const walkX = (x - mouseCoords.current.startX) * 1.5;
      const walkY = (y - mouseCoords.current.startY) * 1.5;
      myElement.scrollLeft = mouseCoords.current.scrollLeft - walkX;
      myElement.scrollTop = mouseCoords.current.scrollTop - walkY;
    }
  }
  const open = Boolean(anchorCatagories);

  const handleViewCatagories = () => {
    setViewCatagories(!viewCatagories)
  }

  const handleSelectCatagory = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorCatagories(event.currentTarget);
    handleViewCatagories()
  };
  const handleCloseCatagory = () => {
    setAnchorCatagories(null);
    handleViewCatagories()
  };

  if (productsNetworkStatus.products === NetworkState.SUCCESS && boxNetworkStatus.getBox === NetworkState.SUCCESS) {
    return (
      <div style={{ paddingLeft: "2.00%", paddingTop: "4.00%" }}>
        {productDialogOpen && (
          <ProductInformation
            isOpen={productDialogOpen}
            productItem={products[productID]}
            addDialog={(item: ShoppingCartItem) => addItemToCart(item)}
            closeDialog={() => handleProductDialog()}
            productImage={images[productID].image}
          />
        )}
        <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
          <Typography variant="h3" color="text.secondary">
            ONE KAROO
          </Typography>
          <Button
            variant="text"
            sx={{ color: "black", fontSize: "20px" }}
            onClick={handleSelectCatagory}
          >Catagories</Button>
          <Menu
            anchorEl={anchorCatagories}
            open={viewCatagories}
            onClose={handleCloseCatagory}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {productCatagories().map((value, index) => {
              return (
                <MenuItem onClick={() => {
                  handleCloseCatagory()
                  dispatch(updateFilteredCatagories(value.productCategory))
                  props.displayFilterPage()
                }}>{value.productCategory}</MenuItem>
              )
            })}
          </Menu>
          <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Gift packeges</Button>
          <Button variant="text" sx={{ color: "black", fontSize: "20px" }} onClick={() => props.aboutUs()}>About Us</Button>
          <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Contact Us</Button>
          <Button variant="text" sx={{ color: "black", fontSize: "20px" }} onClick={() => {    dispatch(goToCart(box));
            props.displayShoppingCart()}}>Shopping Cart</Button>
        </Grid>
        <Grid container>
          <Grid item xs={3} sx={{ paddingBottom: '1.00%' }}>
            <Autocomplete
              open={openFilter}
              options={products.map((option) => option.productName)}
              filterOptions={((options, state) => options.filter((filtered) => filtered.includes(state.inputValue)))}
              onChange={(event, value) => {
                if (value !== null)
                  setFilterItems(value)
                setOpenFilter(false)
              }}
              onInputChange={(_, value) => {
                dispatch(updateFilter(value))
                if (value.length < 3) {
                  if (openFilter) setOpenFilter(false);
                } else {
                  if (!openFilter) setOpenFilter(true);
                }
              }}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label="Search"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: (
                      <InputAdornment position='end' >
                        <Button onClick={() => {
                          dispatch(updateFilter(filterItems))
                          props.displayFilterPage()
                        }} endIcon={<Search />} />
                      </InputAdornment>
                    )
                  }}
                />}
            />
          </Grid>
        </Grid>
        <Typography variant="h3" color="text.secondary" sx={{ paddingTop: '30px', paddingBottom: '15px' }}>
          Specials
        </Typography>
        <div ref={ourRef} onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseMove={handleDrag} className={"" + "flex overflow-x-scroll"}>
          <Grid id='Grid1' container wrap='nowrap' sx={{ overflowX: 'hidden' }} spacing={2}>
            {products.map((value, index) =>
            (
              <Grid item xs={2} sx={{ paddingBottom: '1.00%' }} key={value.productId}>
                <ProductImage
                  productItem={value}
                  productImage={images[index].image}
                  productIndex={index}
                  openProductDialog={(productId: number) => {
                    handleproductID(productId);
                    handleProductDialog();
                    setIsMouseDownLong(false)
                  }}
                />
                <Button variant='outlined' sx={{ width: '100%' }} onClick={() => {
                  handleproductID(value.productId)
                  handleProductDialog()
                }}>Add To Cart</Button>
              </Grid>
            )
            )}
          </Grid>
        </div>
        <Typography variant="h3" color="text.secondary" sx={{ paddingTop: '10px', paddingBottom: '15px' }}>
          Specials
        </Typography>
        <Grid container wrap='nowrap' sx={{ overflowY: "auto", overflowX: 'hidden', overflow: 'scroll' }} spacing={2}>
          <Grid item xs={1} />
          {products.map((value, index) =>
          (
            <Grid item xs={2} sx={{ paddingBottom: '1.00%' }}>
              <ProductImage
                productItem={value}
                productIndex={index}
                productImage={images[index].image}
                openProductDialog={(productId: number) => {
                  if (!isMouseDownLong) {
                    handleproductID(productId);
                    handleProductDialog();
                  }
                }}
              />
            </Grid>
          )
          )}
          <Grid item xs={1} />
        </Grid>
        <br />
        <br />
        <Typography variant="h3" color="text.secondary">
          Seasonal Items
        </Typography>
        <br />
        <br />
        <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
          {products.map((value, index) =>
          (
            <Grid item xs={2} sx={{ paddingBottom: '1.00%' }}>
              <ProductImage
                productItem={value}
                productIndex={index}
                productImage={images[index].image}
                openProductDialog={(productId: number) => {
                  handleproductID(productId);
                  handleProductDialog();
                }}
              />
            </Grid>
          )
          )}
        </Grid>
      </div>
    )
  }
  return (
    <div>
      <Typography variant="h4" component="h2">
        This is the
      </Typography>
      <Grid >

      </Grid>
    </div>
  )
}

export default Homepage