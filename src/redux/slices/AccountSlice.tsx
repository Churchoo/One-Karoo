import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NetworkState } from '../../constants/networkState';
import { getBox } from '../../api/BoxAPI';
import { CreateAccount, GetAccount } from '../../api/AccountAPI';

interface CreateAccount {
  id: number,
  Username: string,
  EmailAddress: string,
  Password: string,
  salt: string,
  GoogleUser: boolean
}

interface Account {
  Username: string,
  EmailAddress: string,
  Password: string,
  GoogleUser: boolean
}



interface accountSliceInterface {
  accountNetworkStatus: {
    createAccount: NetworkState,
    getAccount: NetworkState
  }
  errors: {
    createAccount: string | undefined,
    getAccount: string | undefined,
  },
  account: Account[],
  loggedIn: boolean
}

const initialState: accountSliceInterface = {
  accountNetworkStatus: {
    createAccount: NetworkState.NOT_STARTED,
    getAccount: NetworkState.NOT_STARTED,
  },
  errors: {
    createAccount: '',
    getAccount: ''
  },
  account: [],
  loggedIn: false
}

const accountSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    createAccountPending(state) {
      state.accountNetworkStatus.createAccount = NetworkState.PENDING
    },
    createAccountSuccess(state, action) {
      state.accountNetworkStatus.createAccount = NetworkState.SUCCESS
      state.account = action.payload
      state.loggedIn = false
    },
    createAccountFalied(state, action) {
      state.accountNetworkStatus.createAccount = NetworkState.ERROR
      state.errors.createAccount = "error"
    },
    getAccountPending(state) {
      state.accountNetworkStatus.getAccount = NetworkState.PENDING
    },
    getAccountSuccess(state, action) {
      state.accountNetworkStatus.getAccount = NetworkState.SUCCESS
      state.account = action.payload
      state.loggedIn = true
    },
    getAccountFailed(state) {
      state.accountNetworkStatus.getAccount = NetworkState.ERROR
      state.errors.getAccount = "Error getting account"
    },
    LogOut(state) {
      state.loggedIn = false
    }
  },
  extraReducers: (builder) => {
  },
});

export const {
  createAccountPending,
  createAccountSuccess,
  createAccountFalied,
  getAccountPending,
  getAccountSuccess,
  getAccountFailed
} = accountSlice.actions;

export default accountSlice.reducer;

export const createNewAccount = (account: Account) => async (dispatch: any) => {
  try {
    dispatch(createAccountPending());
    const params: CreateAccount = {
      id: 0,
      Username: account.Username,
      EmailAddress: account.EmailAddress,
      Password: account.Password,
      salt: "",
      GoogleUser: account.GoogleUser
    }
    const accountInfo = await CreateAccount(params)
    dispatch(createAccountSuccess(accountInfo))
  } catch (err: any) {
    dispatch(createAccountFalied(err.toString()));
  }
};

export const getAccount = (account: Account) => async (dispatch: any) => {
  try {
    dispatch(getAccountPending());
    const params: CreateAccount = {
      id: 0,
      Username: account.Username,
      EmailAddress: account.EmailAddress,
      Password: account.Password,
      salt: "",
      GoogleUser: account.GoogleUser
    }
    const accountInfo = await GetAccount(params)
    dispatch(getAccountSuccess(accountInfo))
  } catch (err: any) {
    dispatch(getAccountFailed(err.toString()));
  }
};