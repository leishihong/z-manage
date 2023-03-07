// import LoadingSpinner from 'components/LoadingSpinner';
// import RouterPrompt from 'components/RouterPrompt';
// import PDFPreview from 'components/PDFPreview';
// import TopLoadingBar from 'components/TopLoadingBar';
// import VideoPlayer from 'components/VideoPlayer';

const modulesFiles = import.meta.glob('../components/*/*.tsx', { eager: true }); // 异步方式
const modules: any = {};
for (const [key, value] of Object.entries(modulesFiles)) {
	//名称  因为这里拿到的是  ./modules/app.js ，所以需要两层处理
	const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
	const name = moduleName.split('/')[0];
	//具体的内容，都是每个tsx中返回值  value.default
	modules[name] = (value as any).default;
}

export default modules;
