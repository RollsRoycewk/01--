<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view>
			<view class="iconfont icon-guanbi flex align-center justify-center font-lg" style="width: 100rpx;height: 100rpx;" hover-class="bg-light" @click="back"></view>
		</view>
		
		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">{{status ? '手机验证码登录' : '账号密码登录'}}</view>
		
		<view class="px-2">
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" placeholder="昵称/手机号/邮箱" class="border-bottom p-2"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" placeholder="请输入密码" class="border-bottom p-2 flex-1"/>
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">忘记密码?</view>
				</view>
			</template>
			
			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input type="text" placeholder="手机号" class="border-bottom p-2 flex-1"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" placeholder="请输入验证码" class="border-bottom p-2 flex-2"/>
					<view class="border-bottom flex align-center justify-center font-sm text-white bg-main" style="width: 180rpx;">获取验证码</view>
				</view>
			</template>
			

		</view>
		
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary">登录</button>
		</view>
		
		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-primary font-sm"  @click="changeStatus">{{status?'账号密码登录':'验证码登陆'}}</view>
			<view class="text-muted mx-2">|</view>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>
		
		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #dddddd;width: 100rpx;"></view>
		</view>
		
		<view class="flex align-center px-5 py-3">
			<view class="flex align-center justify-center flex-1">
				<view class="iconfont icon-QQ font-lg text-white bg-primary flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;"></view>
			</view>
			<view class="flex align-center justify-center flex-1">
				<view class="iconfont icon-QQ font-lg text-white bg-primary flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;"></view>
			</view>
			<view class="flex align-center justify-center flex-1">
				<view class="iconfont icon-QQ font-lg text-white bg-primary flex align-center justify-center rounded-circle" style="width: 100rpx;height: 100rpx;"></view>
			</view>
		</view>
		
		<view class="flex align-center justify-center text-muted">
			注册即代表同意<text class="text-primary">《xxx社区协议》</text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	
	export default {
		components:{
			uniStatusBar
		},
		data() {
			return {
				status:false
			};
		},
		methods:{
			back(){
				uni.navigateBack({delta:1})
			},
			// 切换登录方式
			changeStatus(){
				this.status = !this.status;
			}
		}
	}
</script>

<style lang="scss">

</style>
