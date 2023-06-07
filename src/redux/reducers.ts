import { combineReducers } from 'redux'
import productsSlice from './slices/ProductsSlice'

const rootReducer = combineReducers({
    products: productsSlice,
 })
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
