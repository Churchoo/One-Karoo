import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { getProducts } from '../../api/ProductAPI';

export const fetchHistory = createAsyncThunk('history/getHistory', async () => {
    try {
        const res = await getProducts()
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
})

interface historySliceInterface {
    historyNetworkStatus: {
        history: NetworkState,
        isUpdatingHistoryInfo: NetworkState
        isAddingNewHistory: NetworkState,
        isDeletingHistory: NetworkState,
    }
    errors: {
        isUpdatingHistoryInfo: string | undefined,
        isAddingNewHistory: string | undefined,
        isDeletingHistory: string | undefined,
    },
    history: [],
    AccountId: string,
}

const initialState: historySliceInterface = {
    historyNetworkStatus: {
        history: NetworkState.NOT_STARTED,
        isUpdatingHistoryInfo: NetworkState.NOT_STARTED,
        isAddingNewHistory: NetworkState.NOT_STARTED,
        isDeletingHistory: NetworkState.NOT_STARTED,
    },
    errors: {
        isUpdatingHistoryInfo: '',
        isAddingNewHistory: '',
        isDeletingHistory: '',
    },
    AccountId: '',
    history: [],
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    
  },
});

export const {

} = historySlice.actions;

export default historySlice.reducer;
