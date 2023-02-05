import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock';
import viteProgress from 'vite-plugin-progress';
import colors from 'picocolors';
import checker from 'vite-plugin-checker';

const pathResolve = (dir) => resolve(process.cwd(), dir);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd(); // 获取项目根路径

	const isBuild = Boolean(command === 'build');
	const viteEnv = loadEnv(mode, root);
	const isReportMode = viteEnv.VITE_VISUALIZER_REPORT === 'true';
	console.log(`output->mode`, mode, command);
	console.log(`output->viteEnv.VITE_APP_BASE_PATH`, viteEnv.VITE_APP_BASE_PATH);

	return {
		plugins: [
			react(),
			// checker({
			//   typescript: true
			// }),
			createHtmlPlugin({
				entry: './src/main.tsx',
				inject: {
					data: {
						title: viteEnv.APP_DOCUMENT_TITLE
					}
				}
			}),
			viteProgress({
				format: `${colors.green(colors.bold('Building'))} ${colors.cyan(
					'[:bar]'
				)} :percent`
			}),
			// eslintPlugin(),
			// createStyleImportPlugin({
			// 	resolves: [AntdResolve()]
			// }),
			viteMockServe({
				mockPath: 'mock',
				localEnabled: true,
				prodEnabled: false,
				supportTs: false,
				watchFiles: true,
				injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
			}),
			visualizer({
				open: isBuild && isReportMode, //注意这里要设置为true，否则无效
				gzipSize: true,
				brotliSize: true
			}),
			viteCompression({
				verbose: true,
				disable: false,
				// filter:()=>{}, // 那些资源不压缩
				threshold: 1024 * 50, // 体积大于 threshold 才会被压缩,单位 b
				deleteOriginFile: false, // 压缩后是否删除源文件
				algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
				ext: '.gz' // 生成的压缩包后缀
			})
		],
		resolve: {
			alias: {
				// '~antd': pathResolve('./node_modules/antd'),
				src: pathResolve('src'), // 设置 `@` 指向 `src` 目录
				api: pathResolve('src/api'),
				components: pathResolve('src/components'),
				assets: pathResolve('src/assets'),
				image: pathResolve('src/assets/image'),
				styles: pathResolve('src/styles'),
				plugins: pathResolve('src/plugins'),
				hooks: pathResolve('src/hooks'),
				views: pathResolve('src/views'),
				utils: pathResolve('src/utils'),
				routers: pathResolve('src/routers'),
				store: pathResolve('src/store'),
				constants: pathResolve('src/constants'),
				layout: pathResolve('src/layout')
			}
		},
		css: {
			preprocessorOptions: {
				//less文件
				less: {
					additionalData: `@import "${pathResolve(
						'src/styles/variable.less'
					)}";`,
					// 支持内联 JavaScript
					javascriptEnabled: true
				}
			}
		},
		envPrefix: 'APP_',
		server: {
			open: true,
			host: true,
			port: 8068,
			hmr: true
		},
		build: {
			outDir: ['production', 'staging'].includes(mode)
				? 'manage-taste-boss'
				: 'manage-taste-boss-test',
			assetsDir: 'static',
			manifest: true,
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/chunks/[name].[hash].js',
					entryFileNames: 'assets/js/[name].[hash].js',
					assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
				}
			}
		}
	};
});
