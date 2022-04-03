export default {
	// 监听网络
	onNetWork() {
		let func = res => {
			if (res.networkType === 'none') {
				uni.showToast({
					title: '当前处于断网状态,请先连接',
					icon: 'none'
				});
			}
		};
		uni.getNetworkType({
			success: func
		});
		uni.onNetworkStatusChange(func);
	},
	// 热更新
	update() {
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			uni.request({
				url: 'https://ceshi.dishait.cn/api/v1/update',
				data: {
					version: widgetInfo.version,
					name: widgetInfo.name
				},
				success: result => {
					var data = result.data;
					if (data.update && data.wgtUrl) {
						uni.downloadFile({
							url: data.wgtUrl,
							success: downloadResult => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(
										downloadResult.tempFilePath,
										{
											force: false
										},
										function() {
											console.log('install success...');
											plus.runtime.restart();
										},
										function(e) {
											console.error('install fail...');
										}
									);
								}
							}
						});
					}
				}
			});
		});
		// #endif
	},
	// 转化公共列表数据
	formatCommonList(v) {
		return {
			id: v.id,
			user_id: v.user_id,
			username: v.user.username,
			userpic: v.user.userpic,
			newstime: v.create_time,
			title: v.title,
			titlepic: v.titlepic,
			isFollow: false,
			support: {
				type: 'support', // 顶
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: v.comment_count,
			share_num: v.sharenum
		};
	},
	// 数组置顶
	__toFirst(arr, index) {
		if (index != 0) {
			arr.unshift(arr.splice(index, 1)[0]);
		}
		return arr;
	}
};
