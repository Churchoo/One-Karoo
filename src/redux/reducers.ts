import { combineReducers } from 'redux'
import productsSlice from './slices/ProductsSlice'
import ShoppingCartSlice from './slices/ShoppingCartSlice'
import BoxSlice from './slices/BoxSlice'
import AccountSlice from './slices/AccountSlice'

const rootReducer = combineReducers({
    products: productsSlice,
    shoppingCart: ShoppingCartSlice,
    boxs: BoxSlice,
    account: AccountSlice
 })
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
