module.exports = {
	chainWebpack: config => {
		// 发行或运行时启用了压缩时会生效
		config.optimization.minimizer('terser').tap(args => {
			const compress = args[0].terserOptions.compress;
			// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
			compress.drop_console = true;
			compress.pure_funcs = [
				'__f__' // App 平台 vue 移除日志代码
				// 'console.debug' // 可移除指定的 console 方法
			];
			return args;
		});
	},
	// 代理
	devServer: {
		port: '8081',
		proxy: {
			'/api/v1': {
				target: 'http://ceshi2.dishait.cn/api/v1',
				pathRewrite: {
					'/api/v1': ''
				}
			}
		}
	}
};
