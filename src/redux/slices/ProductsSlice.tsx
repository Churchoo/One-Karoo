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
    }
    errors: {
        products: string | undefined,
    },
    products: {
        productId: number, 
        productName: string, 
        productDescription: string, 
        productPrice: number, 
        productCategory: string, 
        productAmount: number,
        productWidth: number, 
        productLength:number, 
        productHeight: number 
    }[],
    filteredProducts: string,
    filteredCatagories: string,
    AccountId: string,
}

const initialState: productsSliceInterface = {
    productsNetworkStatus: {
        products: NetworkState.NOT_STARTED,
    },
    errors: {
        products: '',
    },
    AccountId: '',
    products: [],
    filteredProducts: "",
    filteredCatagories: "",
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateFilter(state, action) {
        state.filteredProducts = action.payload
    },
    updateFilteredCatagories(state, action) {
        state.filteredCatagories = action.payload
    },
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
    updateFilter,
    updateFilteredCatagories
} = productsSlice.actions;

export default productsSlice.reducer;
