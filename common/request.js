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

		return uni.request(options);
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
