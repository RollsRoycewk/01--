<template>
	<view>
		<scroll-view
			scroll-y
			style="position: absolute;left: 0;top: 0;right: 0;bottom: 100rpx;"
			:scroll-into-view="scrollInto"
			scroll-with-animation
		>
			<block v-for="(item, index) in list" :key="index">
				<view :id="'chat' + index">
					<user-chat :item="item" :index="index" :pretime="index > 0 ? list[index - 1].create_time : 0"></user-chat>
				</view>
			</block>
		</scroll-view>
		<!-- 底部操作条 -->
		<!-- 		<view class="fixed-bottom border-top bg-white flex align-center" style="height: 100rpx;">
			<input class="flex-1 rounded bg-light ml-2" type="text" v-model="content" placeholder="文明发言"
				style="padding: 5rpx;" @confirm="submit" />
			<view class="iconfont icon-fabu flex align-center justify-center font-lg animated" style="width: 100rpx;"
				hover-class="jello text-main" @click="submit"></view>
		</view> -->
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
import userChat from '@/components/user-chat/user-chat.vue';
import bottomInput from '@/components/common/bottom-input.vue';

export default {
	components: {
		userChat,
		bottomInput
	},
	// 页面加载完成的时候
	onReady() {
		this.pageToBottom();
	},
	data() {
		return {
			scrollInto: '',
			content: '',
			list: [
				{
					user_id: 2,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 1,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 2,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 1,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 2,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 1,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 2,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 1,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 2,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				},
				{
					user_id: 1,
					avatar: '/static/default.jpg',
					username: '昵称',
					data: '你好啊',
					type: 'text',
					create_time: 1570783530
				}
			]
		};
	},
	methods: {
		// 发送消息
		submit(data) {
			let obj = {
				user_id: 1,
				avatar: '/static/default.jpg',
				username: '昵称',
				type: 'text',
				data: data,
				create_time: new Date().getTime()
			};

			this.list.push(obj);
			// 清空输入框
			this.content = '';
			// 滚动到底部
			this.pageToBottom();
		},
		// 滚动到底部
		pageToBottom() {
			let lastIndex = this.list.length - 1;
			if (lastIndex < 0) return;
			this.scrollInto = 'chat' + lastIndex;
		}
	}
};
</script>

<style lang="scss"></style>
