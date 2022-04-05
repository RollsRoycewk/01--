<template>
	<view>
		<!-- 时间 -->
		<view v-if="shortTime" class="flex justify-center font-sm text-light-muted align-center py-2">{{ shortTime }}</view>
		<!-- 消息气泡 -->
		<view class="flex px-2 my-2 align-start" :style="isSelf ? 'flex-direction:row-reverse;' : ''">
			<image
				:src="item.avatar ? item.avatar : '/static/default.jpg'"
				style="width: 100rpx;height:100rpx ;"
				class="rounded-circle"
			></image>
			<view class="bg-light p-2 mx-2 rounded" style="max-width: 400rpx;">
				{{ item.data }}
			</view>
		</view>
	</view>
</template>

<script>
import $T from '@/common/time.js';

// 模拟当前登录用户的userid

export default {
	props: {
		item: Object,
		index: Number,
		pretime: [Number, String]
	},
	computed: {
		// 是否是登陆用户本人
		isSelf() {
			let myId = this.$store.state.user.id;
			return myId === this.item.user_id;
		},
		// 转换时间
		shortTime() {
			return $T.getChatTime(this.item.create_time, this.pretime);
		}
	}
};
</script>

<style lang="stylus"></style>
