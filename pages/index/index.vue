<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view
			scroll-x
			scroll-with-animation
			:scroll-into-view="scrollInto"
			class="scroll-row"
			style="height: 100rpx"
		>
			<view
				v-for="(item, index) in tabBars"
				:id="'tab' + index"
				:key="index"
				class="scroll-row-item px-3 py-2 font-md"
				:class="[tabIndex === index ? 'text-main font-weight-bold font-lg' : '']"
				@click="changeTab(index)"
			>
				{{ item.classname }}
			</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" :style="'height:' + scrollH + 'px;'" @change="onChangeTab">
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
					<!-- 加载中 -->
					<template v-else-if="!item.firstLoad">
						<view class="text-light-muted flex align-center justify-center font-md" style="height: 200rpx;">
							加载中...
						</view>
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
			tabBars: [],
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
		this.navigateTo({
			url: '../add-input/add-input'
		});
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(110);
			}
		});
		// 根据选项卡获取数据
		this.getData();
		// 监听关注和顶踩操作
		uni.$on('updateFollowOrSupport', e => {
			switch (e.type) {
				case 'follow': // 关注
					this.follow(e.data.user_id);
					break;
				case 'support': // 顶踩
					this.doSupport(e.data);
					break;
			}
		});
	},
	onUnload() {
		// 如果没有回调,会清除所有事件
		uni.$off('updateFollowOrSupport', e => {});
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
			// 请求数据
			item.page++;
			this.getList();
		},
		// 获取数据
		async getData() {
			// 获取分类
			await this.$H.get('/postclass').then(res => {
				this.tabBars = res.list;
			});

			const arr = [];
			for (const item of this.tabBars) {
				// 生成列表模板
				arr.push({
					// 1.上拉加载更多  2.加载中... 3.没有更多了
					loadmore: '上拉加载更多',
					list: [],
					page: 1,
					firstLoad: false
				});
			}
			this.newsList = arr;

			// 获取第一个分类的数据
			if (this.tabBars.length) {
				this.getList();
			}
		},
		// 获取第一个分类的数据
		getList() {
			let index = this.tabIndex;
			let id = this.tabBars[index].id;
			let page = this.newsList[index].page;
			let isrefresh = page === 1;

			this.$H.get('/postclass/' + id + '/post/' + page, {}, { token: true, noCheck: true }).then(res => {
				const list = res.list.map(v => {
					return this.$U.formatCommonList(v);
				});

				this.newsList[index].list = isrefresh ? list : [...this.newsList[index].list, ...list];
				this.newsList[index].loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多';

				if (isrefresh) {
					this.newsList[index].firstLoad = true;
				}
			});
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
			// 获取当前分类下的列表数据
			if (!this.newsList[this.tabIndex].firstLoad) {
				this.getList();
			}
		},
		// 关注
		follow(user_id) {
			// 找到当前作者的所有列表
			this.newsList.forEach(tab => {
				tab.list.forEach(item => {
					if (item.user_id === user_id) {
						item.isFollow = true;
					}
				});
			});
			uni.showToast({ title: '关注成功' });
		},
		// 顶踩操作
		doSupport(e) {
			// 拿到当前的选项卡对应的list
			this.newsList[this.tabIndex].list.forEach(item => {
				if (item.id === e.id) {
					// 之前没有操作过
					if (item.support.type === '') {
						item.support[e.type + '_count']++;
					} else if (item.support.type === 'support' && e.type === 'unsupport') {
						// 顶 - 1
						item.support.support_count--;
						// 踩 + 1
						item.support.unsupport_count++;
					} else if (item.support.type === 'unsupport' && e.type === 'support') {
						// 之前踩了
						// 顶 + 1
						item.support.support_count++;
						// 踩 - 1
						item.support.unsupport_count--;
					}
					item.support.type = e.type;
				}
			});
			let msg = e.type === 'support' ? '顶' : '踩';
			uni.showToast({ title: msg + '成功' });
		}
	}
};
</script>

<style></style>
