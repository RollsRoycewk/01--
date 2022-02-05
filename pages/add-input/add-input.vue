<template>
	<view>
		<uni-nav-bar left-icon="back" statusBar :border="false" @clickLeft="goBack">
			<view class="flex align-center justify-center w-100">
				所有人可见<text class="iconfont icon-shezhi"></text>
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	
	export default {
		components:{
			uniNavBar
		},
		data() {
			return {
				
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

<style>

</style>
