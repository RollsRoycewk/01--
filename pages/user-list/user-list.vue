<template>
	<!-- 好友列表 -->
	<view>
		<!-- tab -->
		<view class="flex align-center py-2">
			<view
				v-for="(item, index) in tabBars"
				:key="index"
				class="flex flex-1 align-center justify-center"
				:class="index === tabIndex ? 'font-lg font-weight-bold text-main' : 'font-md'"
				@click="changeTab(index)"
			>
				{{ item.name }}
				<text v-if="item.num > 0">{{ item.num }}</text>
			</view>
		</view>
		<!-- 列表 -->
		<swiper :duration="150" :current="tabIndex" :style="'height:' + scrollH + 'px;'" @change="onChangeTab">
			<swiper-item v-for="(item, index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2, index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<user-list :item="item2" :index="index2"></user-list>
						</block>
						<!-- 上拉加载 -->
						<load-more v-if="item.list.length > 10" :loadmore="item.loadmore"></load-more>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import loadMore from '@/components/common/load-more.vue';
import noThing from '@/components/common/no-thing.vue';
import userList from '@/components/user-list/user-list.vue';

export default {
	components: {
		loadMore,
		noThing,
		userList
	},
	filters: {
		formatNum(value) {
			return value > 99 ? '99+' : value;
		}
	},
	data() {
		return {
			// 列表高度
			scrollH: 600,
			tabIndex: 0,
			tabBars: [
				{
					name: '互关',
					num: 0,
					key: 'friends'
				},
				{
					name: '关注',
					num: 0,
					key: 'follows'
				},
				{
					name: '粉丝',
					num: 0,
					key: 'fens'
				}
			],
			newsList: []
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(101);
			}
		});
		// 根据选项生成列表
		this.getData();
	},
	methods: {
		// 获取数据
		getData() {
			var arr = [];
			for (let i = 0; i < this.tabBars.length; i++) {
				// 生成列表模板
				let obj = {
					// 1.上拉加载更多  2.加载中... 3.没有更多了
					loadmore: '上拉加载更多',
					list: [],
					page: 1,
					firstLoad: false
				};
				arr.push(obj);
			}
			this.newsList = arr;
			this.getList();
		},
		getList() {
			let index = this.tabIndex;
			let id = this.tabBars[index].id;
			let page = this.newsList[index].page;
			let isrefresh = page === 1;
			this.$H
				.get(
					'/' + this.tabBars[index].key + '/' + page,
					{},
					{
						token: true,
						noCheck: true
					}
				)
				.then(res => {
					console.log(res);
					let list = res.list.map(v => {
						return {
							id: v.id,
							avatar: v.userpic,
							username: v.username,
							sex: v.userinfo.sex,
							age: v.userinfo.age,
							isFollow: index !== 2
						};
					});

					this.newsList[index].list = isrefresh ? list : [...this.newsList[index].list, ...list];

					this.newsList[index].loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多';

					if (isrefresh) {
						this.newsList[index].firstLoad = true;
					}
				})
				.catch(err => {
					if (!isrefresh) {
						this.newsList[index].page--;
					}
				});
		},
		// tab切换
		changeTab(index) {
			this.tabIndex = index;
		},
		// 监听滑动
		onChangeTab(e) {
			this.changeTab(e.detail.current);
			if (!this.newsList[e.detail.current].firstLoad) {
				this.getList();
			}
		},
		// 上拉加载更多
		loadmore(index) {
			// 拿到当前列表
			let item = this.newsList[index];
			// 判断是否处于可加载状态（上拉加载更多）
			if (item.loadmore !== '上拉加载更多') return;
			// 修改当前列表加载状态
			item.loadmore = '加载中...';
			// 修改当前列表加载状态
			item.loadmore = '加载中...';
			// 数据请求
			item.page++;
			this.getList();
		}
	},
	// 监听原生标题栏搜索输入框点击事件
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: '../search/search?type=user'
		});
	},
	// 监听原生标题栏按钮点击事件
	onNavigationBarButtonTap() {
		uni.navigateBack({
			delta: 1
		});
	}
};
</script>

<style></style>
