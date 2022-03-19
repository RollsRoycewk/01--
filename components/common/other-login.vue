<template>
	<view class="flex align-center px-5 py-3">
		<view class="flex align-center justify-center flex-1" v-for="(item, index) in providerList" :key="index">
			<view
				:class="item.icon + ' ' + item.bgColor"
				class="iconfont font-lg text-white flex align-center justify-center rounded-circle"
				style="width: 100rpx; height: 100rpx"
			></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			providerList: [
				{
					providerName: '微信登录',
					icon: 'icon-weixin',
					bgColor: 'bg-success'
				},
				{
					providerName: 'QQ登录',
					icon: 'icon-QQ',
					bgColor: 'bg-primary'
				},
				{
					providerName: '新浪微博登录',
					icon: 'icon-xinlangweibo',
					bgColor: 'bg-warning'
				}
			]
		};
	}
};
</script>

<style></style>
