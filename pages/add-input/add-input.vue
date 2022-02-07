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
		<!-- 多图上传 -->
		<upload-image :list="imageList" @change="changeImage"></upload-image>
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer-btn animated" hover-class="jello"></view>
			<view class="iconfont icon-huati footer-btn animated" hover-class="jello"></view>
			<view class="iconfont icon-tupian footer-btn animated" hover-class="jello"></view>
			<view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-2 animated"
				style="width: 140rpx;height: 60rpx;">发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue";
	import uploadImage from "@/components/common/upload-image.vue"

	export default {
		components: {
			uniNavBar,
			uploadImage
		},
		data() {
			return {
				content: "",
				imageList: [],
				// 是否已经弹出提示框
				showBack: false
			}
		},
		// 监听页面加载
		onLoad(){
			uni.getStorage({
				key:"add-input",
				success:(res)=>{
					if(res.data){
						const result = JSON.parse(res.data);
						this.content = result.content;
						this.imageList = result.imageList;
					}
				}
			})
		},
		methods: {
			// 监听返回事件
			onBackPress() {
				if ((this.content || this.imageList.length) && !this.showBack) {
					uni.showModal({
						title: '是否要保存为草稿？',
						content: '',
						showCancel: true,
						cancelText: '不保存',
						confirmText: '保存',
						success: res => {
							// 点击确认
							if (res.confirm) {
								this.store();
							}
							// 手动执行返回操作
							uni.navigateBack({
								delta: 1
							});
						}
					});
					this.showBack = true;
					return true;
				}

			},
			// 返回上一步
			goBack() {
				uni.navigateBack();
			},
			// 选中图片
			changeImage(e) {
				console.log("e", e);
				this.imageList = e;
			},
			// 保存操作
			store() {
				// 保存为本地操作
				const obj = {
					content: this.content,
					imageList: this.imageList
				}
				uni.setStorage({
					key: "add-input",
					data: JSON.stringify(obj)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer-btn {
		width: 86rpx;
		height: 86rpx;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		font-size: 50rpx;
	}
</style>
