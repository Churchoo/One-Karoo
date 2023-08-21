import { combineReducers } from 'redux'
import productsSlice from './slices/ProductsSlice'
import ShoppingCartSlice from './slices/ShoppingCartSlice'
import BoxSlice from './slices/BoxSlice'

const rootReducer = combineReducers({
    products: productsSlice,
    shoppingCart: ShoppingCartSlice,
    boxs: BoxSlice
 })
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
