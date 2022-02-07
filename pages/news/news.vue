<template>
	<!-- 动态 -->
	<view>
		<!-- 自定义navBar -->
		<uni-nav-bar :border="false" fixed statusBar @clickRight="openAddInput">
			<view class="flex w-100 font-weight-bold justify-center align-center">
				<view class="mx-1" v-for="(item,index) in tabBars" :key="index"
					:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-light-muted'"
					@click="changeTab(index)">
					{{item.name}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>
		<!-- 数据列表 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmoreEvent">
					<!-- 列表 -->
					<template v-if="list.length">
						<block v-for="(v, i) in list" :key="i">
							<!-- 列表样式 -->
							<common-list :item="v" :index="i" @follow="follow" @doSupport="doSupport"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="loadmore"></load-more>
					</template>
					<template v-else>
						<no-thing></no-thing>
					</template>

				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const demo = [{
			username: "昵称",
			userpic: "/static/default.jpg",
			newstime: "2019-10-20 下午04:30",
			isFollow: true,
			title: "我是标题",
			titlepic: "/static/demo/datapic/11.jpg",
			support: {
				type: "support", // 顶
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 2,
			share_num: 2
		},
		{
			username: "昵称",
			userpic: "/static/default.jpg",
			newstime: "2019-10-20 下午04:30",
			isFollow: true,
			title: "我是标题",
			titlepic: "",
			support: {
				type: "unsupport", // 踩
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 2,
			share_num: 2
		},
		{
			username: "昵称",
			userpic: "/static/default.jpg",
			newstime: "2019-10-20 下午04:30",
			isFollow: true,
			title: "我是标题",
			titlepic: "",
			support: {
				type: "", // 未操作
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 2,
			share_num: 2
		}
	];

	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import commonList from '@/components/common/common-list.vue';
	import divider from '@/components/common/divider';
	import loadMore from '@/components/common/load-more.vue';
	import noThing from '@/components/common/no-thing.vue'

	export default {
		components: {
			uniNavBar,
			commonList,
			divider,
			loadMore,
			noThing
		},
		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
				tabBars: [{
					name: "关注"
				}, {
					name: "话题"
				}],
				// 关注列表
				list: [],
				// 1.上拉加载更多  2.加载中... 3.没有更多了
				loadmore: "上拉加载更多"
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			// 加载测试数据
			this.list = demo;
		},
		methods: {
			// 打开发布页
			openAddInput(){
				console.log("ghjkl");
				uni.navigateTo({
					url:"../add-input/add-input"
				})
			},
			// 切换选项卡
			changeTab(i) {
				this.tabIndex = i;
			},
			// 滑动
			onChangeTab(e) {
				this.tabIndex = e.detail.current;
			},
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				let item = this.list[e.index]
				let msg = e.type === 'support' ? '顶' : '踩'
				// 之前没有操作过
				if (item.support.type === '') {
					item.support[e.type + '_count']++
				} else if (item.support.type === 'support' && e.type === 'unsupport') {
					// 顶 - 1
					item.support.support_count--;
					// 踩 + 1
					item.support.unsupport_count++;
				} else if (item.support.type === 'unsupport' && e.type === 'support') { // 之前踩了
					// 顶 + 1
					item.support.support_count++;
					// 踩 - 1
					item.support.unsupport_count--;
				}
				item.support.type = e.type
				uni.showToast({
					title: msg + '成功'
				});
			},
			// 上拉加载
			loadmoreEvent() {
				// 验证当前是否处于可加载状态
				if (this.loadmore !== '上拉加载更多') return;
				// 设置加载状态
				this.loadmore = '加载中...';
				// 模拟请求数据
				setTimeout(() => {
					// 加载数据
					this.list = [...this.list, ...this.list]
					// 设置加载状态
					this.loadmore = '上拉加载更多';
				}, 1500)
			}
		}
	}
</script>

<style lang="scss">

</style>
