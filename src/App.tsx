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
import karooBackground from './images/karooPicPlaceholder.jpg'

export interface CustomComponent {
  index?: boolean,
  path: string,
  element: any,
  children?: any[],
  title?: string,
  icon?: any,
  key?: string
}

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const [shoppingCartPage, setShoppingCartPage] = useState(false)
  const [filterItemsPage, setFilterItemsPage] = useState(false)
  const [deliveryDetailsPage, setDeliveryDetailsPage] = useState(false)
  const [aboutUsPage, setAboutUsPage] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
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

  const setLogin = () => {
    setLoggedIn(!loggedIn)
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

  if (aboutUsPage) {
    <AboutUs
      homepage={() => displayHomePage()}
    />
  }

  if (filterItemsPage) {
    return (
      <FilteredItems
        userLoggedIn={loggedIn}
        homepage={() => displayHomePage()}
        displayShoppingCart={() => displayShoppingCart}
        aboutUs={() => displayAboutUs}
        displayFilterPage={() => displayFilterPage()}
      />
    )
  }

  if (deliveryDetailsPage) {
    return (
      // <div style={{
      //   backgroundImage: `url(${karooBackground})`,
      //   backgroundSize: 'auto',
      //   backgroundAttachment: 'fixed',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      //   overflow: 'hidden'
      // }}>
      <DeliveryDetails
        homepage={() => displayHomePage()}
        aboutUs={() => displayAboutUs()}
      />
      //</div>
    )
  }
  if (shoppingCartPage) {
    return (
      // <div style={{
      //   backgroundImage: `url(${karooBackground})`,
      //   backgroundSize: 'auto',
      //   backgroundAttachment: 'fixed',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      //   overflow: 'hidden'
      // }}>
      <ShoppingCart
        shoppingCartItems={shoppingCartItems}
        homepage={() => displayHomePage()}
        deliveryPage={() => displayDeliveryDetails()}
        aboutUs={() => displayAboutUs()}
      />
      //</div>
    )
  }
  return (
    //<div style={{
    //   backgroundImage: `url(${karooBackground})`,
    //   backgroundSize: '100% 100%',
    //   backgroundAttachment: 'fixed',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: 'center',
    //   overflow: 'hidden'
    // }}>
    <Homepage
      userLoggedIn={loggedIn}
      displayFilterPage={() => displayFilterPage()}
      displayShoppingCart={() => displayShoppingCart()}
      aboutUs={() => displayAboutUs()}
      login={() => setLogin()}
    />
    //</div>
  );
}

export default App;
