<template>
	<view>
		<view>
			<image :src="info.cover" mode="aspectFill" style="height: 300rpx;" class="w-100 filter">
			</image>
		</view>

		<view class="position-relative bg-white px-2 pb-2" style="z-index: 10;">
			<view class="flex">
				<image src="/static/demo/topicpic/1.jpeg" style="width: 150rpx;height: 150rpx;margin-top: -75rpx;"
					class="rounded mr-2"></image>
				<text class="font-md">#{{info.title}}#</text>
			</view>

			<view class="flex align-center font text-secondary mt-1">
				<text class="mr-2">动态:{{info.news_count}}</text>
				<text>今日:{{info.today_count}}</text>
			</view>
			<view class="text-secondary font-md">{{info.desc}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['info'],
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.filter {
		/*  
	   filter(滤镜) 属性
	   blur 给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；
	  */
		filter: blur(10px);
	}
</style>
