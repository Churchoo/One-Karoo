import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { getBox } from '../../api/BoxAPI';

export const fetchBox = createAsyncThunk('box/getBox', async () => {
    try {
        const res = await getBox()
        return res
    } catch (error: any) {
        throw new Error(error.message)
    }
})

interface boxSliceInterface {
    boxNetworkStatus: {
        getBox: NetworkState,
    }
    errors: {
        box: string | undefined,
    },
    box: {boxId: number, width: number, length: number, height: number, Size: string, price: number }[],
}

const initialState: boxSliceInterface = {
    boxNetworkStatus: {
        getBox: NetworkState.NOT_STARTED,
    },
    errors: {
        box: '',
    },
    box: [],
}

const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchBox.pending, (state) => {
            state.boxNetworkStatus.getBox = NetworkState.PENDING
        })
        .addCase(fetchBox.fulfilled, (state, action) =>{
            state.boxNetworkStatus.getBox = NetworkState.SUCCESS
            state.box = action?.payload
        })
        .addCase(fetchBox.rejected, (state, action) =>{
            state.boxNetworkStatus.getBox = NetworkState.ERROR
            state.errors.box = action?.error?.message
            
        })
  },
});

export const {
} = boxSlice.actions;

export default boxSlice.reducer;
