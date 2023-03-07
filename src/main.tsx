import ReactDOM from 'react-dom/client';
import App from './App';

import './index.less';

const { VITE_APP_ENV } = import.meta.env;

const securityConfig =
	VITE_APP_ENV === 'development'
		? { securityJsCode: 'd2aba0f3e27322791004ddb2d49cd81a' }
		: { serviceHost: `${VITE_APP_ENV}/_AMapService` };
window._AMapSecurityConfig = securityConfig;

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(<App />);

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<App />
// 		</Provider>
// 	</React.StrictMode>
// );
