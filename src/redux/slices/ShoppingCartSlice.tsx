import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { getProducts } from '../../api/ProductAPI';
import { cubicCalculation } from '../../Calculations/cubicMeterCalculation';

// export const fetchProducts = createAsyncThunk('product/getProducts', async () => {
//     try {
//         const res = await getProducts()
//         return res
//     } catch (error: any) {
//         throw new Error(error.message)
//     }
// })
interface ShoppingCartItem {
  productId: number,
  productDescription: string,
  productName: string,
  productPrice: number,
  numProducts: number,
  productWidth: number,
  productLength: number,
  productHeight: number
}

interface box {
  boxId: number,
  width: number,
  length: number,
  height: number,
  Size: string,
  price: number
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
  shoppingCart: ShoppingCartItem[],
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
    removeShoppingCartSuccess(state, action) {
      state.shoppingCart = state.shoppingCart.splice(action.payload, 1);
    },
    removeShoppingCartError(state) {
      state.shoppingCartNetworkStatus.shoppingCart = NetworkState.ERROR;
    },
    goToCartSuccess(state, action) {
      let boxAdded = false;
      const box = action.payload
      let boxNo = 1
      let tableData = state.shoppingCart
      console.log('here')
      if (tableData.length > 0) {
        let totalItemSize = 0
        tableData.map((value) => {
          totalItemSize += cubicCalculation(value.productWidth, value.productLength, value.productHeight)
        })
        while (!boxAdded) {
          for (let i = 0; i < box.length; i++) {
            let BoxSize = cubicCalculation(box[i].width, box[i].length, box[i].height)
            if (BoxSize > totalItemSize && !boxAdded) {
              const boxInfo: ShoppingCartItem = {
                numProducts: boxNo,
                productDescription: "box to place items in",
                productHeight: box[i].height,
                productId: 999,
                productLength: box[i].length,
                productName: "Box",
                productPrice: box[i].price,
                productWidth: box[i].width
              }
              state.shoppingCart = tableData.concat(boxInfo)
              boxAdded = true
              break
            }
            console.log(boxAdded)
          }
          boxNo+=1
        }
      }
    },
    leaveCartSuccess(state) {
      let tableData = state.shoppingCart
      try{
        for (let index = 0; index < tableData.length; index++) {
          const i = tableData.findIndex((value) => value.productName === "Box")
          state.shoppingCart = state.shoppingCart.splice(i, 1);
        }
      } 
      catch(error:any){

      }
      
    }
  },
  extraReducers: (builder) => {
  },
});

export const {
  addShoppingCartSuccess,
  addShoppingCartItemError,
  removeShoppingCartSuccess,
  removeShoppingCartError,
  goToCartSuccess,
  leaveCartSuccess
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;

export const addToShppingCart = (item: ShoppingCartItem) => async (dispatch: any) => {
  try {
    dispatch(addShoppingCartSuccess(item));
  } catch (err: any) {
    dispatch(addShoppingCartItemError(err.toString()));
  }
};

export const goToCart = (box: box[]) => async (dispatch: any) => {
  try {
    dispatch(goToCartSuccess(box))
  } catch (err: any) {
  }

}

export const leaveToCart = () => async (dispatch: any) => {
  dispatch(leaveCartSuccess())
}