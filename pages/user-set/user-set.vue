<template>
	<view>
		<uni-list-item title="账号与安全" @click="open"></uni-list-item>
		<uni-list-item title="资料编辑"></uni-list-item>
		<uni-list-item title="清除缓存"></uni-list-item>
		<uni-list-item title="意见反馈"></uni-list-item>
		<uni-list-item title="关于社区"></uni-list-item>
		
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary">退出登录</button>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';

	export default {
		components: {
			uniListItem
		},
		data() {
			return {

			};
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '../user-password/user-password'
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
