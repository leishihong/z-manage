import { createAsyncThunk } from '@reduxjs/toolkit';
import { FeatureKey } from 'store/featureKey';
import { setLoginInfo, clearLoginInfo } from './index';
// import { fetchLogout } from 'api/login';

export const handleLogout = createAsyncThunk(
  `${FeatureKey.LOGIN_SLICE}/fetchLogout`,
  async ({ callback }: any, { dispatch, getState }) => {
    try {
      const {
        loginState: { loginInfo },
      }: any = getState();
      // const { status } = await fetchLogout({ userCode: loginInfo.userCode });
      // if (status === 200) {
      //   dispatch(clearLoginInfo());
      //   callback?.();
      // }
    } catch (error) {}
  }
);
