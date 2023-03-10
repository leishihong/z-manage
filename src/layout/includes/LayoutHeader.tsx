import { Fragment, FC } from 'react';
import {
	Tooltip,
	Input,
	Avatar,
	Modal,
	Dropdown,
	Layout,
	Breadcrumb,
	Button
} from 'antd';
import type { MenuProps } from 'antd';
import {
	BellOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SettingOutlined,
	PoweroffOutlined,
	FullscreenOutlined,
	ExpandOutlined,
	CompressOutlined,
	LoadingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFullscreen, useRequest } from 'ahooks';
import { map } from 'lodash';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { updateRouterPrompt, toggleCollapse } from 'store/globalSlice';
import { handleLogout } from 'store/loginSlice/actions';

import { HOME_URL } from 'constants/config';

import IconButton from './IconButton';
import AvatarIcon from 'assets/images/user-avatar.png';

import 'layout/style/layout-header.less';

const { Header } = Layout;

const Navbar: FC = () => {
	const { settings, userInfo, userLoading, isCollapsed, breadcrumbList } =
		useAppSelector(({ globalState }) => globalState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);

	const handleClickLogout = useCallback(() => {
		dispatch(
			handleLogout({
				callback: async () => {
					await dispatch(updateRouterPrompt({ routerPrompt: true }));
					navigate('/login');
				}
			})
		);
	}, []);

	const menuItemList: MenuProps['items'] = [
		{
			label: (
				<Fragment>
					<SettingOutlined className="dropdown-icon" />
					用户设置
				</Fragment>
			),
			key: 'setting'
		},
		{
			label: (
				<Fragment>
					<PoweroffOutlined className="dropdown-icon" />
					用户设置
				</Fragment>
			),
			key: 'logout'
		}
	];
	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		console.log('click', key);
		if (key === 'logout') {
			Modal.confirm({
				title: '温馨提示',
				content: '您确定要退出登录吗？',
				onOk: handleClickLogout
			});
		}
	};

	return (
		<Header className="layout-header">
			<div className="left">
				<div
					className="collapsed"
					onClick={() => {
						dispatch(toggleCollapse({ isCollapsed: !isCollapsed }));
					}}
				>
					{isCollapsed ? (
						<MenuUnfoldOutlined id="isCollapse" />
					) : (
						<MenuFoldOutlined id="isCollapse" />
					)}
				</div>
				{settings.breadcrumb && (
					<Breadcrumb>
						<Breadcrumb.Item key="home" onClick={() => navigate(HOME_URL)}>
							首页
						</Breadcrumb.Item>
						{map(breadcrumbList[pathname], (item: string) => {
							return (
								item !== '首页' && (
									<Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
								)
							);
						})}
					</Breadcrumb>
				)}
			</div>
			<ul className="right">
				<li>
					<Tooltip title={isFullscreen ? '退出全屏' : '全屏'}>
						<IconButton
							onClick={toggleFullscreen}
							icon={
								isFullscreen ? <FullscreenOutlined /> : <CompressOutlined />
							}
						/>
					</Tooltip>
				</li>
				{userInfo && (
					<li>
						<Dropdown
							menu={{ items: menuItemList, onClick: handleMenuClick }}
							placement="bottomRight"
							disabled={userLoading}
						>
							<Avatar
								size={36}
								style={{ cursor: 'pointer' }}
								src={<img alt="avatar" src={AvatarIcon} />}
							/>
						</Dropdown>
					</li>
				)}
			</ul>
		</Header>
	);
};

export default memo(Navbar);
