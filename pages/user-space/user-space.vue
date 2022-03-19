<template>
	<view>
		<!-- 头部 -->
		<view class="flex p-3 border-bottom border-light-secondary">
			<image src="/static/default.jpg" style="width: 180rox; height: 180rpx" class="rounded-circle"></image>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex align-center">
					<view class="flex flex-column align-center justify-center flex-1">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
					<view class="flex flex-column align-center justify-center flex-1">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
					<view class="flex flex-column align-center justify-center flex-1">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
				</view>
				<view class="flex justify-center align-center"><button type="primary" size="mini" class="bg-main" style="width: 400rpx">关注</button></view>
			</view>
		</view>

		<!-- tab -->
		<view class="flex align-center" style="height: 100rpx">
			<view
				class="flex-1 flex align-center justify-center"
				v-for="(item, index) in tabBars"
				:key="index"
				:class="index === tabIndex ? 'font-lg font-weight-bold text-main' : 'font-md'"
				@click="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</view>

		<template v-if="tabIndex === 0">
			<view class="p-3 border-bottom">
				<view class="font-md">账号信息</view>
				<view class="font">账号年龄: 12个月</view>
				<view class="font">账号id: 1</view>
			</view>
			<view class="p-3 border-bottom">
				<view class="font-md">个人信息</view>
				<view class="font">星座: 12个月</view>
				<view class="font">职业: 1</view>
				<view class="font">故乡: 1</view>
				<view class="font">情感: 1</view>
			</view>
		</template>
		<template v-else>
			<view class="animated fast fadeIn">
				<common-list v-for="(item, index) in list" :key="index" :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list>
				<divider></divider>
				<load-more :loadmore="loadmore"></load-more>
			</view>
		</template>

		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="py-2 flex align-center justify-center font-md border-bottom" hover-class="bg-light">
				<text class="iconfont icon-sousuo mr-2"></text>
				加入黑名单
			</view>
			<view class="py-2 flex align-center justify-center font-md border-bottom" hover-class="bg-light">
				<text class="iconfont icon-sousuo mr-2"></text>
				聊天
			</view>
		</uni-popup>
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
import loadMore from '@/components/common/load-more.vue';
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';

export default {
	components: {
		commonList,
		loadMore,
		uniPopup
	},
	data() {
		return {
			tabIndex: 0,
			tabBars: [
				{
					name: '主页'
				},
				{
					name: '帖子',
					list: demo,
					// 1.上拉加载更多  2.加载中... 3.没有更多了
					loadmore: '上拉加载更多'
				},
				{
					name: '动态',
					list: demo,
					// 1.上拉加载更多  2.加载中... 3.没有更多了
					loadmore: '上拉加载更多'
				}
			]
		};
	},
	onNavigationBarButtonTap() {
		this.$refs.popup.open();
	},
	computed: {
		list() {
			return this.tabBars[this.tabIndex].list;
		},
		loadmore() {
			return this.tabBars[this.tabIndex].loadmore;
		}
	},
	methods: {
		changeTab(i) {
			this.tabIndex = i;
		},

		// 关注
		follow(e) {
			// 拿到当前的选项卡对应的list
			let list = this.tabBars[this.tabIndex].list;
			list[e].isFollow = true;
			uni.showToast({ title: '关注成功' });
		},
		// 顶踩操作
		doSupport(e) {
			// 拿到当前的选项卡对应的list
			let list = this.tabBars[this.tabIndex].list;
			// 拿到当前对象
			let item = list[e.index];
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
				// 之前踩了
				// 顶 + 1
				item.support.support_count++;
				// 踩 - 1
				item.support.unsupport_count--;
			}
			item.support.type = e.type;
			uni.showToast({ title: msg + '成功' });
		}
	}
};
</script>

<style lang="scss"></style>
