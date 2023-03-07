import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import viteEslintPlugin from 'vite-plugin-eslint';
// import viteStylelint from 'vite-plugin-stylelint';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
import AutoImport from 'unplugin-auto-import/vite';
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
	console.log(viteEnv, 'viteEnv');
	return {
		plugins: [
			react(),
			splitVendorChunkPlugin(),
			AutoImport({
				imports: ['react', 'react-router-dom'],
				dts: 'src/auto-import.d.ts' // 路径下自动生成文件夹存放全局指令
			}),

			// checker({
			//   typescript: true
			// }),
			createHtmlPlugin({
				entry: './src/main.tsx',
				inject: {
					data: {
						title: '我的热爱'
					}
				}
			}),
			viteProgress({
				format: `${colors.green(colors.bold('Building'))} ${colors.cyan(
					'[:bar]'
				)} :percent`
			}),
			viteEslintPlugin(),
			// viteStylelint(),
			createStyleImportPlugin({
				resolves: [AntdResolve()]
			}),
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
			// visualizer({
			// 	open: isBuild && isReportMode, //注意这里要设置为true，否则无效
			// 	gzipSize: true,
			// 	brotliSize: true
			// }),
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
				'~antd': pathResolve('./node_modules/antd'),
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
			// 忽略后缀名的配置选项, 添加  选项时要记得原本默认忽略的选项也要手动写入
			// extensions: ['.ts', '.jsx', '.tsx', '.json']
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
		// 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
		// envPrefix: 'APP_',
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
