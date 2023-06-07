import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { getProducts } from '../../api/ProductAPI';

export const fetchProducts = createAsyncThunk('accounts/getAccounts', async () => {
    try {
        const res = await getProducts()
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
})

interface productsSliceInterface {
    productsNetworkStatus: {
        products: NetworkState,
        isUpdatingProductInfo: NetworkState
        isAddingNewProduct: NetworkState,
        isDeletingProduct: NetworkState,
    }
    errors: {
        isUpdatingProductInfo: string | undefined,
        isAddingNewProduct: string | undefined,
        isDeletingProduct: string | undefined,
    },
    products: [],
    AccountId: string,
}

const initialState: productsSliceInterface = {
    productsNetworkStatus: {
        products: NetworkState.NOT_STARTED,
        isUpdatingProductInfo: NetworkState.NOT_STARTED,
        isAddingNewProduct: NetworkState.NOT_STARTED,
        isDeletingProduct: NetworkState.NOT_STARTED,
    },
    errors: {
        isUpdatingProductInfo: '',
        isAddingNewProduct: '',
        isDeletingProduct: '',
    },
    AccountId: '',
    products: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    
  },
});

export const {

} = productsSlice.actions;

export default productsSlice.reducer;
