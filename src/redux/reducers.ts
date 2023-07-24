import { combineReducers } from 'redux'
import productsSlice from './slices/ProductsSlice'
import ShoppingCartSlice from './slices/ShoppingCartSlice'

const rootReducer = combineReducers({
    products: productsSlice,
    shoppingCart: ShoppingCartSlice
 })
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
