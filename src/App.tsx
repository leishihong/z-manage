import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { store, persistor } from 'store/index';

import SetUpRoutes from 'routers/index';
import Components from 'components/index';
import './App.less';

dayjs.locale('en');

const App: FC = () => {
	return (
		<Provider store={store}>
			<PersistGate
				loading={<Components.LoadingSpinner />}
				persistor={persistor}
			>
				<ConfigProvider
					componentSize="large"
					locale={zhCN}
					getPopupContainer={(triggerNode: any) => {
						if (triggerNode) {
							return triggerNode.parentNode;
						}
						return document.body;
					}}
					theme={{
						token: {
							colorPrimary: '#1F63FF'
						}
					}}
				>
					<div className="app-container">
						<BrowserRouter basename="/">
							<SetUpRoutes />
						</BrowserRouter>
					</div>
				</ConfigProvider>
			</PersistGate>
		</Provider>
	);
};
export default App;
