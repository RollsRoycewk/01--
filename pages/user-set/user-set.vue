<template>
	<view>
		<template v-if="loginStatus">
			<uni-list-item title="账号与安全" @click="open('user-safe')"></uni-list-item>
			<uni-list-item title="资料编辑" @click="open('user-userinfo')"></uni-list-item>
		</template>

		<uni-list-item title="清除缓存" @click="clear">
			<view slot="right" class="text-muted">{{ currentSize | format }}</view>
		</uni-list-item>
		<uni-list-item title="意见反馈" @click="open('user-feedback')"></uni-list-item>
		<uni-list-item title="关于社区" @click="open('about')"></uni-list-item>

		<view v-if="loginStatus" class="py-2 px-3" @click="logout">
			<button class="bg-main text-white" style="border-radius: 50rpx; border: 0" type="primary">退出登录</button>
		</view>
	</view>
</template>

<script>
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import { mapState } from 'vuex';

export default {
	components: {
		uniListItem
	},

	onLoad() {
		this.getStorageInfo();
	},
	filters: {
		format(value) {
			return value > 1024 ? (value / 1024).toFixed(2) + 'MB' : value.toFixed(2) + 'KB';
		}
	},
	data() {
		return {
			currentSize: 0
		};
	},
	computed: {
		...mapState({
			loginStatus: state => state.loginStatus
		})
	},
	methods: {
		open(path) {
			uni.navigateTo({
				url: `../${path}/${path}`
			});
		},
		getStorageInfo() {
			let res = uni.getStorageInfoSync();
			this.currentSize = res.currentSize;
		},
		// 清除缓存
		clear() {
			uni.showModal({
				title: '提示',
				content: '是否要清除所有缓存？',
				cancelText: '不清除',
				confirmText: '清除',
				success: res => {
					if (res.confirm) {
						uni.clearStorageSync();
						this.getStorageInfo();
						uni.showToast({
							title: '清除成功',
							icon: 'none'
						});
					}
				}
			});
		},
		logout() {
			uni.showModal({
				content: '是否要退出登录',
				success: res => {
					if (res.confirm) {
						// 退出登录
						this.$store.commit('logout');

						// 关闭websocket
						this.$store.dispatch('closeSocket');

						uni.navigateBack({
							delta: 1
						});
						uni.showToast({
							title: '退出登录成功',
							icon: 'none'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss"></style>
