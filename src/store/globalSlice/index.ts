import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "store/featureKey";

export interface GlobalState {
  settings: any;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
    permissions: Record<string, string[]>;
  };
  collapsed: boolean;
  userLoading?: boolean;
  routerPrompt?: boolean;
}

const initialState: GlobalState = {
  settings: { themeColor: "#1F63FF" },
  collapsed: false,
  userInfo: {
    permissions: {},
  },
  routerPrompt: false,
};

const globalSlice = createSlice({
  name: FeatureKey.GLOBAL_SLICE,
  initialState,
  reducers: {
    updateUserInfo: (state, { payload }: PayloadAction<GlobalState>) => {
      const { userInfo = initialState.userInfo, userLoading } = payload;
      state.userLoading = userLoading;
      state.userInfo = userInfo;
    },
    toggleCollapse: (state, { payload }: PayloadAction<GlobalState>) => {
      state.collapsed = payload.collapsed;
    },
    updateRouterPrompt: (state, { payload }: PayloadAction<any>) => {
      state.routerPrompt = payload.routerPrompt;
    },
  },
  extraReducers: {},
});
export const { updateUserInfo, toggleCollapse, updateRouterPrompt } =
  globalSlice.actions;
export default globalSlice.reducer;
