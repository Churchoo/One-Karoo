import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { getProducts } from '../../api/ProductAPI';

// export const fetchProducts = createAsyncThunk('product/getProducts', async () => {
//     try {
//         const res = await getProducts()
//         return res
//     } catch (error: any) {
//         throw new Error(error.message)
//     }
// })
interface shoppingCartItem {
    productId: number,
    productDescription: string,
    productName: string,
    productPrice: number,
    numProducts: number
  }

interface shoppingCartSliceInterface {
    shoppingCartNetworkStatus: {
        shoppingCart: NetworkState,
        isUpdatingProductInfo: NetworkState
        isAddingNewProduct: NetworkState,
        isDeletingProduct: NetworkState,
    }
    errors: {
        products: string | undefined,
        isUpdatingProductInfo: string | undefined,
        isAddingNewProduct: string | undefined,
        isDeletingProduct: string | undefined,
    },
    shoppingCart: shoppingCartItem[],
    AccountId: string,
}

const initialState: shoppingCartSliceInterface = {
    shoppingCartNetworkStatus: {
        shoppingCart: NetworkState.NOT_STARTED,
        isUpdatingProductInfo: NetworkState.NOT_STARTED,
        isAddingNewProduct: NetworkState.NOT_STARTED,
        isDeletingProduct: NetworkState.NOT_STARTED,
    },
    errors: {
        products: '',
        isUpdatingProductInfo: '',
        isAddingNewProduct: '',
        isDeletingProduct: '',
    },
    AccountId: '',
    shoppingCart: [],
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addShoppingCartSuccess(state, action) {
        const shoppingCartItems = state.shoppingCart.concat(action.payload)
        state.shoppingCart = shoppingCartItems;

      },
      addShoppingCartItemError(state) {
        state.shoppingCartNetworkStatus.shoppingCart = NetworkState.ERROR;

      },
  },
  extraReducers: (builder) => {
  },
});

export const {
    addShoppingCartSuccess,
    addShoppingCartItemError
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;

export const addToShppingCart = (item: shoppingCartItem) => async (dispatch: any) => {
    try {
      dispatch(addShoppingCartSuccess(item));
    } catch (err: any) {
      dispatch(addShoppingCartItemError(err.toString()));
    }
  };