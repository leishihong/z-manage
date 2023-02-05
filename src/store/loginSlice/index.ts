import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureKey } from 'store/featureKey';

export interface ILoginState {
  token: string;
  rememberPwd: boolean;
  loginInfo: { [key: string]: any };
}

const initialState: ILoginState = {
  token: '',
  rememberPwd: false,
  loginInfo: {
    userCode: '',
    password: ''
  }
};

const loginSlice = createSlice({
  name: FeatureKey.LOGIN_SLICE,
  initialState,
  reducers: {
    loginOut: (state, { payload }: PayloadAction) => {
      console.log(state, payload);
    },
    setRememberPwd: (state, { payload }: PayloadAction<boolean>) => {
      state.rememberPwd = payload;
    },
    setAuthToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setLoginInfo: (state, { payload }: PayloadAction<{ [key: string]: any }>) => {
      state.loginInfo = payload.loginInfo;
    },
    clearLoginInfo: (state) => {
      if (!state.rememberPwd) {
        state.loginInfo = { userCode: '', password: '' };
        state.rememberPwd = false;
      }
      state.token = '';
    }
  },
  extraReducers: {}
});
export const { loginOut, setLoginInfo, setAuthToken, setRememberPwd, clearLoginInfo } = loginSlice.actions;

export default loginSlice.reducer;
