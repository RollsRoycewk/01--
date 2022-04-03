<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- 搜索历史 -->
			<view class="py-2 px-2 font-md">搜索历史</view>
			<view class="flex flex-wrap">
				<view
					v-for="(item, index) in list"
					:key="index"
					class="border rounded font mx-2 my-1 px-2"
					hover-class="bg-light"
					@click="clickSearchHistory(item)"
				>
					{{ item }}
				</view>
			</view>
		</template>
		<template v-else>
			<!-- 数据列表 -->
			<block v-for="(item, index) in searchList" :key="index">
				<template v-if="type === 'post'">
					<!-- 帖子 -->
					<common-list :item="item" :index="index"></common-list>
				</template>

				<template v-else-if="type === 'topic'">
					<!-- 话题 -->
					<topic-list :item="item" :index="index"></topic-list>
				</template>

				<template v-else>
					<!-- 用户 -->
					<user-list :item="item" :index="index"></user-list>
				</template>
			</block>

			<!-- 上拉加载 -->
			<load-more :loadmore="loadmore"></load-more>
		</template>
	</view>
</template>

<script>
import commonList from '@/components/common/common-list.vue';
import topicList from '@/components/news/topic-list.vue';
import userList from '@/components/user-list/user-list.vue';
import loadMore from '@/components/common/load-more.vue';

export default {
	components: {
		commonList,
		topicList,
		userList,
		loadMore
	},
	data() {
		return {
			searchText: '',
			list: [],
			// 搜索结果
			searchList: [],
			// 当前搜索类型
			type: 'post',
			loadmore: '上拉加载更多',
			page: 1
		};
	},
	// 监听原生标题栏搜索输入框输入内容变化事件
	onNavigationBarSearchInputChanged(e) {
		this.searchText = e.text;
	},
	// 监听原生标题栏按钮点击事件，参数为Object
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.searchEvent();
		}
	},
	onLoad(e) {
		if (e.type) {
			this.type = e.type;
		}

		let pageTitle = '帖子';
		switch (this.type) {
			case 'post':
				pageTitle = '帖子';
				break;
			case 'topic':
				pageTitle = '话题';
				break;
			case 'user':
				pageTitle = '用户';
				break;
		}

		// 修改搜索占位
		// #ifdef APP-PLUS
		let currentWebview = this.$mp.page.$getAppWebview();
		let tn = currentWebview.getStyle().titleNView;
		tn.searchInput.placeholder = '搜索' + pageTitle;
		currentWebview.setStyle({
			titleNView: tn
		});
		// #endif

		// 取出搜索历史
		let list = uni.getStorageSync('historySeachText');
		if (list) {
			this.list = JSON.parse(list);
		}
	},
	// 监听上拉加载
	onReachBottom() {
		if (this.loadmore !== '上拉加载更多') {
			return;
		}
		this.loadmore = '加载中...';
		this.getData(false);
	},
	// 监听下拉刷新
	onPullDownRefresh() {
		if (this.searchText === '') {
			return uni.stopPullDownRefresh();
		}
		this.getData(true, () => {
			// 关闭下拉刷新状态
			uni.stopPullDownRefresh();
		});
	},
	methods: {
		// 点击搜索历史
		clickSearchHistory(text) {
			this.searchText = text;
			this.searchEvent();
		},
		// 搜索事件
		searchEvent() {
			// 收起键盘
			uni.hideKeyboard();
			// 加入搜索历史
			let index = this.list.findIndex(v => v === this.searchText);
			if (index !== -1) {
				this.$U.__toFirst(this.list, index);
			} else {
				this.list.unshift(this.searchText);
			}
			uni.setStorageSync('historySeachText', JSON.stringify(this.list));

			// 请求搜索
			this.getData();
		},
		// 获取数据
		getData(isrefresh = true, callback = false) {
			// 显示loading状态
			uni.showLoading({
				title: '加载中...'
			});

			// 页码
			this.page = isrefresh ? 1 : this.page + 1;

			// 请求搜索
			this.$H
				.post('/search/' + this.type, {
					keyword: this.searchText,
					page: this.page
				})
				.then(res => {
					// 整理格式
					let list = [];
					switch (this.type) {
						case 'post':
							list = res.list.map(v => {
								return this.$U.formatCommonList(v);
							});
							break;
						case 'topic':
							list = res.list.map(v => {
								return {
									id: v.id,
									cover: v.titlepic,
									title: v.title,
									desc: v.desc,
									today_count: v.todaypost_count,
									news_count: v.post_count
								};
							});
							break;
						case 'user':
							break;
					}

					// 渲染页面
					this.searchList = isrefresh ? list : [...this.searchList, ...list];
					// 加载情况
					this.loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多';
				})
				.catch(err => {
					this.page--;
				})
				.finally(() => {
					//隐藏loading
					uni.hideLoading();
					if (typeof callback === 'function') {
						callback();
					}
				});
		}
	}
};
</script>

<style lang="scss"></style>
