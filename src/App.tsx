import { FC, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { GlobalContext } from 'src/context';
import router from 'routers/index';
import './App.less';

interface GlobalContext {
	theme: string;
	setTheme: (theme?: string) => void;
}

const App: FC = () => {
	const [theme, setTheme] = useState<string>('light'); //主题 默认日间模式
	const contextVal = { theme, setTheme } as GlobalContext;
	return (
		<div className="app-container">
			<GlobalContext.Provider value={contextVal}>
				<RouterProvider router={router} />
			</GlobalContext.Provider>
		</div>
	);
};
export default App;
