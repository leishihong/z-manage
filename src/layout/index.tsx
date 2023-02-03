import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderComponent, AsideComponent, FooterComponent } from './components';
import './style.less';
const { Header, Content, Footer } = Layout;
function DefaultLayout() {
	return (
		<Layout className="default-container text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-300">
			<Header
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					padding: 0,
					backgroundColor: 'transparent'
				}}
			>
				<HeaderComponent />
			</Header>
			<Content className="main-content">
				<div className="content-box">
					<AsideComponent />
					<div className="article-content" style={{ width: '79.17%' }}>
						<Outlet />
					</div>
				</div>
			</Content>
			<Footer style={{ backgroundColor: 'transparent', padding: 0 }}>
				<FooterComponent />
			</Footer>
		</Layout>
	);
}
export default React.memo(DefaultLayout);
