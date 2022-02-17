<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		// 监听原生标题栏按钮点击事件 
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
</script>

<style>

</style>
