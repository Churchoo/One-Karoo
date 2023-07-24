import React, { useState } from 'react';
import './App.css';
import Homepage from './screen/Homepage';
import ShoppingCart from './screen/ShoppingCart';
import { useAppSelector } from './hooks/hooks';

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
  const [shoppingCartPage, setshoppingCartPage] = useState(false)
  console.log(shoppingCartPage)
  const shoppingCartItems = useAppSelector((state) => state.shoppingCart.shoppingCart)

  const displayShoppingCart = () => {
    console.log(shoppingCartPage)
    setshoppingCartPage(!shoppingCartPage)
  }

  if(shoppingCartPage){
    return (
      <ShoppingCart 
       shoppingCartItems={shoppingCartItems}
       homepage={() => displayShoppingCart()}
      />
    )
  }
  return (
   <Homepage
    product={"homepage"}
    displayShoppingCart={()=>displayShoppingCart()}
    />
  );
}

export default App;
