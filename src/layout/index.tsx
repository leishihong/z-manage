import { PropsWithChildren, FC, memo, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Button, FloatButton, Card, theme } from 'antd';
import {
  QuestionCircleOutlined,
  SyncOutlined,
  SmileOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import type { ProSettings } from '@ant-design/pro-components';
import LayoutHeader from './includes/LayoutHeader';

const { Header, Content, Footer } = Layout;

const DefaultLayout: FC = (props: PropsWithChildren) => {
  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      breakpoint={false}
      defaultCollapsed
      pageTitleRender={false}
      menuDataRender={() => [
        {
          path: '/one',
          icon: <SmileOutlined />,
          name: '一级名称',
          children: [
            {
              path: 'two',
              name: '二级名称',
            },
          ],
        },
      ]}
      layout="mix"
      location={{
        pathname: '/one/two',
      }}
    >
      <Card>
        <Outlet />
        <FloatButton.BackTop />
      </Card>
    </ProLayout>
    // <Layout className="default-container text-gray-700 bg-white dark:bg-gray-900 dark:text-gray-300">
    // 	<Header
    // 		style={{
    // 			position: 'sticky',
    // 			top: 0,
    // 			zIndex: 1,
    // 			width: '100%',
    // 			padding: 0,
    // 			backgroundColor: 'transparent'
    // 		}}
    // 	>
    // 		<LayoutHeader />
    // 	</Header>
    // 	<Content className="main-content">
    // 		<div className="content-box">
    // 			{/* <AsideComponent /> */}
    // 			<div className="article-content">
    // 				<Outlet />
    // 				<FloatButton.BackTop />
    // 			</div>
    // 		</div>
    // 	</Content>
    // </Layout>
  );
};
export default memo(DefaultLayout);
