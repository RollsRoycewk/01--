<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x scroll-with-animation :scroll-into-view="scrollInto" class="scroll-row" style="height: 100rpx">
			<view
				class="scroll-row-item px-3 py-2 font-md"
				:id="'tab' + index"
				:class="[tabIndex === index ? 'text-main font-weight-bold font-lg' : '']"
				v-for="(item, index) in tabBars"
				:key="index"
				@click="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<swiper-item v-for="(item, index) in newsList" :key="index">
				<scroll-view scroll-y :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore(index)">
					<!-- 列表 -->
					<template v-if="item.list.length">
						<block v-for="(v, i) in item.list" :key="i">
							<!-- 列表样式 -->
							<common-list :item="v" :index="i" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"></load-more>
					</template>
					<template v-else>
						<no-thing></no-thing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
const demo = [
	{
		username: '昵称',
		userpic: '/static/default.jpg',
		newstime: '2019-10-20 下午04:30',
		isFollow: false,
		title: '我是标题',
		titlepic: '/static/demo/datapic/11.jpg',
		support: {
			type: 'support', // 顶
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_num: 2
	},
	{
		username: '昵称',
		userpic: '/static/default.jpg',
		newstime: '2019-10-20 下午04:30',
		isFollow: false,
		title: '我是标题',
		titlepic: '',
		support: {
			type: 'unsupport', // 踩
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_num: 2
	},
	{
		username: '昵称',
		userpic: '/static/default.jpg',
		newstime: '2019-10-20 下午04:30',
		isFollow: false,
		title: '我是标题',
		titlepic: '',
		support: {
			type: '', // 未操作
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_num: 2
	}
];

import commonList from '@/components/common/common-list.vue';
import divider from '@/components/common/divider';
import loadMore from '@/components/common/load-more.vue';
import noThing from '@/components/common/no-thing.vue';

export default {
	components: {
		commonList,
		divider,
		loadMore,
		noThing
	},
	data() {
		return {
			scrollH: 200,
			tabIndex: 0,
			scrollInto: '',
			tabBars: [
				{
					name: '关注'
				},
				{
					name: '推荐'
				},
				{
					name: '体育'
				},
				{
					name: '热点'
				},
				{
					name: '财经'
				},
				{
					name: '娱乐'
				},
				{
					name: '军事'
				},
				{
					name: '历史'
				},
				{
					name: '本地'
				}
			],
			newsList: []
		};
	},
	// 监听点击导航栏搜索框
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: '../search/search?type=post'
		});
	},
	// 监听原生标题栏按钮点击事件，参数为Object
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: '../add-input/add-input'
		});
	},
	onLoad() {
		console.log('this.$C', this.$C.webUrl);
		this.$store.commit('changeLoginStatus', { num: 123 });
		console.log('this.$Store', this.$store.state.loginState);
		uni.getSystemInfo({
			success: (res) => {
				this.scrollH = res.windowHeight - uni.upx2px(110);
			}
		});
		// 根据选项卡获取数据
		this.getData();
	},
	methods: {
		// 上拉加载更多
		loadmore(index) {
			// 拿到当前列表
			const item = this.newsList[index];
			// 判断是否处于可加载状态(上拉加载更多)
			if (item.loadmore !== '上拉加载更多') return;
			// 修改当前列表加载状态
			item.loadmore = '加载中......';
			// 模拟数据请求
			setTimeout(() => {
				// 加载数据
				item.list = [...item.list, ...item.list];
				// 恢复初始加载状态
				item.loadmore = '上拉加载更多';
			}, 500);
		},
		// 获取数据
		getData() {
			const arr = [];
			for (let i = 0; i < this.tabBars.length; i++) {
				// const obj = {
				// 	// 1.上拉加载更多  2.加载中... 3.没有更多了
				// 	loadmore: '上拉加载更多',
				// 	list: [{
				// 			username: '昵称',
				// 			userpic: '/static/default.jpg',
				// 			newstime: '2019-10-20 下午04:30',
				// 			isFollow: false,
				// 			title: '我是标题',
				// 			titlepic: '/static/demo/datapic/11.jpg',
				// 			support: {
				// 				type: 'support', // 顶
				// 				support_count: 1,
				// 				unsupport_count: 2
				// 			},
				// 			comment_count: 2,
				// 			share_num: 2
				// 		},
				// 		{
				// 			username: '昵称',
				// 			userpic: '/static/default.jpg',
				// 			newstime: '2019-10-20 下午04:30',
				// 			isFollow: false,
				// 			title: '我是标题',
				// 			titlepic: '',
				// 			support: {
				// 				type: 'unsupport', // 踩
				// 				support_count: 1,
				// 				unsupport_count: 2
				// 			},
				// 			comment_count: 2,
				// 			share_num: 2
				// 		},
				// 		{
				// 			username: '昵称',
				// 			userpic: '/static/default.jpg',
				// 			newstime: '2019-10-20 下午04:30',
				// 			isFollow: false,
				// 			title: '我是标题',
				// 			titlepic: '',
				// 			support: {
				// 				type: '', // 未操作
				// 				support_count: 1,
				// 				unsupport_count: 2
				// 			},
				// 			comment_count: 2,
				// 			share_num: 2
				// 		},
				// 		{
				// 			username: '昵称',
				// 			userpic: '/static/default.jpg',
				// 			newstime: '2019-10-20 下午04:30',
				// 			isFollow: false,
				// 			title: '我是标题',
				// 			titlepic: '/static/demo/datapic/11.jpg',
				// 			support: {
				// 				type: 'support', // 顶
				// 				support_count: 1,
				// 				unsupport_count: 2
				// 			},
				// 			comment_count: 2,
				// 			share_num: 2
				// 		}
				// 	]
				// };

				// 生成列表模板
				let obj = {
					// 1.上拉加载更多  2.加载中... 3.没有更多了
					loadmore: '上拉加载更多',
					list: []
				};
				if (i < 2) {
					obj.list = demo;
				}
				arr.push(obj);
			}
			this.newsList = arr;
		},
		// 监听滑动
		onChangeTab(e) {
			this.changeTab(e.detail.current);
		},
		// 切换选项
		changeTab(index) {
			if (this.tabIndex === index) return;
			this.tabIndex = index;
			// 滚动到指定元素
			this.scrollInto = 'tab' + index;
		},
		// 关注
		follow(index) {
			this.newsList[this.tabIndex].list[index].isFollow = true;
			uni.showToast({
				title: '关注成功'
			});
		},
		// 顶踩操作
		doSupport(e) {
			// 拿到当前数据对象
			let item = this.newsList[this.tabIndex].list[e.index];
			let msg = e.type === 'support' ? '顶' : '踩';

			// 之前没有操作过
			if (item.support.type === '') {
				item.support[e.type + '_count']++;
			} else if (item.support.type === 'support' && e.type === 'unsupport') {
				// 顶 - 1
				item.support.support_count--;
				// 踩 + 1
				item.support.unsupport_count++;
			} else if (item.support.type === 'unsupport' && e.type === 'support') {
				// 顶 + 1
				item.support.support_count++;
				// 踩 - 1
				item.support.unsupport_count--;
			}
			item.support.type = e.type;
			uni.showToast({
				title: msg + '成功'
			});
		}
	}
};
</script>

<style></style>
