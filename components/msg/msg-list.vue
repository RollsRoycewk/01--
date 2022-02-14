<template>
	<view class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light">
		<image :src="item.avatar" style="height: 80rpx;width: 80rpx;" class="rounded-circle mr-2"></image>
		<!-- 消息列表 -->
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<text class="font-md">{{item.username}}</text>
				<text class="text-secondary font">	{{item.update_time}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="text-secondary text-ellipsis"
					style="max-width: 500rpx;">{{item.data}}</text>
				<uni-badge text="1" />
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-ui/uni-badge/uni-badge.vue";

	export default {
		props:{
			item:Object,
			index:Number
		},
		components: {
			uniBadge
		}
	}
</script>

<style>
</style>
