import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureKey } from 'store/featureKey';
import { GlobalState } from './interface';
import { HOME_URL } from 'constants/config';

const initialState: GlobalState = {
	settings: {
		themeColor: '#1677FF',
		breadcrumb: true,
		sliderMenu:true,
		tagViews: true,
		footer: false,
		menuWidth:220
	},
	isCollapsed: false,
	userInfo: {
		permissions: {}
	},
	authButtons: {},
	authRouter: [],
	routerPrompt: false,
	slideMenuList: [],
	breadcrumbList: {},
	tagViewList: [{ title: '首页', path: HOME_URL }]
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
		toggleCollapse: (state, { payload }: PayloadAction<GlobalState & any>) => {
			state.isCollapsed = payload.isCollapsed;
		},
		updateRouterPrompt: (state, { payload }: PayloadAction<any>) => {
			state.routerPrompt = payload.routerPrompt;
		},
		setAuthButtons: (state, { payload }: PayloadAction<GlobalState & any>) => {
			state.authButtons = payload.authButtons;
		},
		setAuthRouter: (state, { payload }: PayloadAction<GlobalState & any>) => {
			state.authRouter = payload.authRouter;
		},
		setBreadcrumbList: (
			state,
			{ payload }: PayloadAction<GlobalState & any>
		) => {
			state.breadcrumbList = payload.breadcrumbList;
		},
		setSlideMenuList: (
			state,
			{ payload }: PayloadAction<GlobalState & any>
		) => {
			state.slideMenuList = payload.slideMenuList;
		},
		setTagViewList:(state,
			{ payload }: PayloadAction<GlobalState & any>)=>{
				state.tagViewList = payload.tagViewList;
		}
	},
	extraReducers: {}
});
export const {
	updateUserInfo,
	toggleCollapse,
	updateRouterPrompt,
	setAuthButtons,
	setAuthRouter,
	setBreadcrumbList,
	setSlideMenuList,
	setTagViewList
} = globalSlice.actions;
export default globalSlice.reducer;
