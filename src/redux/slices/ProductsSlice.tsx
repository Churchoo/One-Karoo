import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { getProducts } from '../../api/ProductAPI';

export const fetchProducts = createAsyncThunk('product/getProducts', async () => {
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
        products: string | undefined,
        isUpdatingProductInfo: string | undefined,
        isAddingNewProduct: string | undefined,
        isDeletingProduct: string | undefined,
    },
    products: {id: number, productName: string, productDescription: string, productPrice: number }[],
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
        products: '',
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
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.productsNetworkStatus.products = NetworkState.PENDING
        })
        .addCase(fetchProducts.fulfilled, (state, action) =>{
            state.productsNetworkStatus.products = NetworkState.SUCCESS
            state.products = action?.payload
        })
        .addCase(fetchProducts.rejected, (state, action) =>{
            state.productsNetworkStatus.products = NetworkState.ERROR
            state.errors.products = action?.error?.message
            
        })
  },
});

export const {

} = productsSlice.actions;

export default productsSlice.reducer;
