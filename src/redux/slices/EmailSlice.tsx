import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { sendEmail } from '../../api/EmailAPI';

interface emailSliceInterface {
    emailNetworkStatus: {
        email: NetworkState,
    }
    errors: {
        email: string | undefined,
    },
}

const initialState: emailSliceInterface = {
    emailNetworkStatus: {
        email: NetworkState.NOT_STARTED,
    },
    errors: {
        email: '',
    },
}

const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    sendEmailPending(state) {
        state.emailNetworkStatus.email = NetworkState.PENDING
    },
    sendEmailSuccess(state, action) {
        state.emailNetworkStatus.email = NetworkState.SUCCESS
      },
      sendEmailFailed(state, action) {
        state.emailNetworkStatus.email = NetworkState.ERROR
        state.errors.email = "error"
      },
  },
  extraReducers: (builder) => {
    
  },
});

export const {
    sendEmailPending,
    sendEmailFailed,
    sendEmailSuccess
} = boxSlice.actions;

export default boxSlice.reducer;


export const sendUserEmail = (email: InnerHTML, userName: string, userEmail: string, subject: string) => async (dispatch: any) => {
    try {
      dispatch(sendEmailPending());
      const emailInfo = await sendEmail(email, userName, userEmail, subject)
      dispatch(sendEmailSuccess(emailInfo))
    } catch (err: any) {
      dispatch(sendEmailFailed(err.toString()));
    }
  };