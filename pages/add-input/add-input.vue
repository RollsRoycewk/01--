<template>
	<view>
		<!-- 自定义导航 -->
		<uni-nav-bar left-icon="back" statusBar :border="false" @clickLeft="goBack">
			<view class="flex align-center justify-center w-100">
				所有人可见<text class="iconfont icon-shezhi"></text>
			</view>
		</uni-nav-bar>
		<!-- 文本域 -->
		<textarea v-model="content" class="uni-textarea px-2" placeholder="说一句话呗.........."></textarea>
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer-btn animated" hover-class="jello"></view>
			<view class="iconfont icon-huati footer-btn animated" hover-class="jello"></view>
			<view class="iconfont icon-tupian footer-btn animated" hover-class="jello"></view>
			<view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-2 animated" style="width: 140rpx;height: 60rpx;">发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	
	export default {
		components:{
			uniNavBar,
			
		},
		data() {
			return {
				content:""
			}
		},
		methods: {
			// 返回上一步
			goBack(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
.footer-btn{
	width: 86rpx;
	height: 86rpx;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	font-size: 50rpx;
}
</style>
