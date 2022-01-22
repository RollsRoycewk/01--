<template>
	<view>
		<!-- 图标 -->
		<text class="iconfont icon-smile" style="font-size: 100rpx;color:blue;"></text>
		<!-- 动画使用 -->
		<view style="display: flex;justify-content: center;padding: 50rpx;">
			<view class="animated faster" hover-class="rubberBand" style="border: 1rpx solid #333333;padding: 20rpx;">点击效果</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style></style>
