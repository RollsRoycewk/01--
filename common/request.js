import $C from '@/common/config.js';

export default {
	common: {
		methods: 'GET',
		header: {
			'content-type': 'application/json'
		},
		data: {}
	},

	request(options = {}) {
		options.url = $C.webUrl + options.url;
		options.methods = options.methods || this.common.methods;
		options.header = options.header || this.common.header;

		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: result => {
					// 请求服务端失败
					if (result.statusCode !== 200) {
						uni.showToast({
							title: result.data.msg || '请求失败',
							icon: 'none'
						});
						return rej(result.data);
					}
					res(result.data.data);
				},
				fail: error => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej();
				}
			});
		});
	},

	get(url, data = {}, options = {}) {
		options.url = url;
		options.data = data;
		options.methods = 'GET';
		return this.request(options);
	},

	post(url, data = {}, options = {}) {
		options.url = url;
		options.data = data;
		options.methods = 'POST';
		return this.request(options);
	}
};
