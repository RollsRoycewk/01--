<template>
	<!-- 列表样式 -->
	<view class="p-2">
		<!-- 头像昵称|关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<!-- 头像 -->
				<image class="rounded-circle mr-2" :src="item.userpic" lazy-load style="width: 65rpx;height: 65rpx;" @click="openSpace"></image>
				<!-- 昵称/发布时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">{{ item.username }}</view>
					<view class="font-sm text-light-muted" style="line-height: 1.5;">{{ item.newstime }}</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view
				v-if="!item.isFollow"
				class="flex align-center justify-center bg-main text-white animated faster"
				style="width: 90rpx;height: 50rpx;"
				@click="follow"
				hover-class="jello"
			>
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font-md my-1" @click="openDetail">{{ item.title }}</view>
		<!-- 图片 -->
		<image v-if="item.titlepic" :src="item.titlepic" class="rounded w-100" style="350rpx" @click="openDetail"></image>
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" :class="[item.support.type === 'support' ? 'support-active' : '']" @click="doSupport('support')">
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{item.support.support_count > 0 ? item.support.support_count : '支持'}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" :class="[item.support.type === 'unsupport' ? 'support-active' : '']" @click="doSupport('unsupport')">
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.support.unsupport_count > 0 ? item.support.unsupport_count : '反对'}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.comment_count > 0 ? item.comment_count : '评论'}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.share_num > 0 ? item.share_num : '分享'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},
	methods: {
		// 打开个人空间
		openSpace() {
			console.log('打开个人空间');
		},
		// 关注
		follow() {
			// 通知父组件
			this.$emit('follow', this.index);
		},
		// 进入详情页
		openDetail() {
			console.log('进入详情页');
		},
		// 顶踩操作
		doSupport(type){
			// 通知父组件
			this.$emit("doSupport",{
				type:type,
				index:this.index
			})
		}
	}
};
</script>

<style>
		.support-active{
			color: #FF4A6A;
		}
</style>
