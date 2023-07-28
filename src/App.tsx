import React, { useState } from 'react';
import './App.css';
import Homepage from './screen/Homepage';
import ShoppingCart from './screen/ShoppingCart';
import { useAppSelector } from './hooks/hooks';
import DeliveryDetails from './screen/DeliveryDetails';

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
  const [shoppingCartPage, setShoppingCartPage] = useState(false)
  const [deliveryDetailsPage, setDeliveryDetailsPage] = useState(false)
  const [aboutUsPage, setAboutUsPage] = useState(false)
  const shoppingCartItems = useAppSelector((state) => state.shoppingCart.shoppingCart)

  const displayAboutUs = () => {
    setAboutUsPage(!aboutUsPage)
  }

  const displayShoppingCart = () => {
    setShoppingCartPage(!shoppingCartPage)
  }

  const displayDeliveryDetails = () => {
    setDeliveryDetailsPage(!deliveryDetailsPage)
  }

  if(aboutUsPage){

  }

  if(deliveryDetailsPage){
    return (
      <DeliveryDetails 
        homepage={() => displayDeliveryDetails()}
        aboutUs={() => displayAboutUs()}
      />
    )
  }
  if(shoppingCartPage){
    return (
      <ShoppingCart 
       shoppingCartItems={shoppingCartItems}
       homepage={() => displayShoppingCart()}
       deliveryPage={() => displayDeliveryDetails()}
       aboutUs={() => displayAboutUs()}
      />
    )
  }
  return (
   <Homepage
    product={"homepage"}
    displayShoppingCart={()=>displayShoppingCart()}
    aboutUs={() => displayAboutUs()}
    />
  );
}

export default App;
