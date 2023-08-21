import React, { useState } from 'react';
import './App.css';
import Homepage from './screen/Homepage';
import ShoppingCart from './screen/ShoppingCart';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import DeliveryDetails from './screen/DeliveryDetails';
import FilteredItems from './screen/FilteredItems';
import AboutUs from './screen/AboutUs';
import { updateFilter, updateFilteredCatagories } from './redux/slices/ProductsSlice';
import { goToCart } from './redux/slices/ShoppingCartSlice';

export interface CustomComponent {
  index?:boolean,
  path: string,
  element: any,
  children?: any[],
  title?: string,
  icon?: any,
  key?: string
}

const App :React.FC = () => {
  const dispatch = useAppDispatch()
  
  const [shoppingCartPage, setShoppingCartPage] = useState(false)
  const [filterItemsPage, setFilterItemsPage] = useState(false)
  const [deliveryDetailsPage, setDeliveryDetailsPage] = useState(false)
  const [aboutUsPage, setAboutUsPage] = useState(false)
  const shoppingCartItems = useAppSelector((state) => state.shoppingCart.shoppingCart)
  

  const displayHomePage = () => {
    setAboutUsPage(false)
    setFilterItemsPage(false)
    setShoppingCartPage(false)
    setDeliveryDetailsPage(false)
    dispatch(updateFilter(""))
    dispatch(updateFilteredCatagories(""))
  }

  const displayAboutUs = () => {
    setAboutUsPage(!aboutUsPage)
  }

  const displayFilterPage = () => {
    console.log(filterItemsPage)
    setAboutUsPage(false)
    setDeliveryDetailsPage(false)
    setShoppingCartPage(false)
    setFilterItemsPage(!filterItemsPage)
  }

  const displayShoppingCart = () => {
    setAboutUsPage(false)
    setFilterItemsPage(false)
    setDeliveryDetailsPage(false)
    setShoppingCartPage(!shoppingCartPage)
  }

  const displayDeliveryDetails = () => {
    setAboutUsPage(false)
    setFilterItemsPage(false)
    setShoppingCartPage(false)
    setDeliveryDetailsPage(!deliveryDetailsPage)
  }

  if(aboutUsPage){
    <AboutUs 
    homepage={() => displayAboutUs()}
    />
  }

  if(filterItemsPage){
    return(
      <FilteredItems
      homepage={() => displayHomePage()}
      displayShoppingCart={()=> displayShoppingCart}
      aboutUs={()=> displayAboutUs}
      />
    )
  }

  if(deliveryDetailsPage){
    return (
      <DeliveryDetails 
        homepage={() => displayHomePage()}
        aboutUs={() => displayAboutUs()}
      />
    )
  }
  if(shoppingCartPage){
    return (
      <ShoppingCart 
       shoppingCartItems={shoppingCartItems}
       homepage={() => displayHomePage()}
       deliveryPage={() => displayDeliveryDetails()}
       aboutUs={() => displayAboutUs()}
      />
    )
  }
  return (
   <Homepage
   displayFilterPage={()=>displayFilterPage()}
    displayShoppingCart={()=>displayShoppingCart()}
    aboutUs={() => displayAboutUs()}
    />
  );
}

export default App;
