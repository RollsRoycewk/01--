<template>
	<!-- 列表样式 -->
	<view class="p-2 animated fast fadeIn">
		<!-- 头像昵称|关注按钮 -->
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<!-- 头像 -->
				<image
					class="rounded-circle mr-2"
					:src="item.titlepic"
					lazy-load
					style="width: 65rpx;height: 65rpx;"
					@click="openSpace(item.user_id)"
				></image>
				<!-- 昵称/发布时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">{{ item.username }}</view>
					<view class="font-sm text-light-muted" style="line-height: 1.5;">{{ item.newstime | formatTime }}</view>
				</view>
			</view>
			<!-- 按钮 -->
			<view
				v-if="!item.isFollow && user.id !== item.user_id"
				class="flex align-center justify-center rounded bg-main text-white animated faster"
				style="width: 90rpx;height: 50rpx;"
				hover-class="jello"
				@click="follow"
			>
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font-md my-1" @click="openDetail">{{ item.title }}</view>
		<!-- 帖子详情 -->
		<slot>
			<!-- 图片 -->
			<image v-if="item.titlepic" :src="item.titlepic" class="rounded w-100" style="350rpx" @click="openDetail"></image>
		</slot>

		<!-- 图标按钮 -->
		<view class="flex align-center">
			<view
				class="flex align-center justify-center flex-1 animated faster"
				hover-class="jello text-main"
				:class="[item.support.type === 'support' ? 'support-active' : '']"
				@click="doSupport('support')"
			>
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{ item.support.support_count > 0 ? item.support.support_count : '支持' }}</text>
			</view>
			<view
				class="flex align-center justify-center flex-1 animated faster"
				hover-class="jello text-main"
				:class="[item.support.type === 'unsupport' ? 'support-active' : '']"
				@click="doSupport('unsupport')"
			>
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{ item.support.unsupport_count > 0 ? item.support.unsupport_count : '反对' }}</text>
			</view>
			<view
				class="flex align-center justify-center flex-1 animated faster"
				hover-class="jello text-main"
				@click="doComment"
			>
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{ item.comment_count > 0 ? item.comment_count : '评论' }}</text>
			</view>
			<view
				class="flex align-center justify-center flex-1 animated faster"
				hover-class="jello text-main"
				@click="doShare"
			>
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{ item.share_num > 0 ? item.share_num : '分享' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import $T from '@/common/time.js';
import { mapState } from 'vuex';

export default {
	filters: {
		formatTime(value) {
			return $T.gettime(value);
		}
	},
	props: {
		item: Object,
		index: Number,
		isdetail: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	methods: {
		// 打开个人空间
		openSpace(user_id) {
			uni.navigateTo({ url: '/pages/user-space/user-space?user_id=' + user_id });
		},
		// 关注
		follow() {
			this.checkAuth(() => {
				this.$H
					.post(
						'/follow',
						{
							follow_id: this.item.user_id
						},
						{
							token: true
						}
					)
					.then(res => {
						// 通知父组件
						uni.$emit('updateFollowOrSupport', {
							type: 'follow',
							data: {
								user_id: this.item.user_id
							}
						});
					});
			});
		},
		// 进入详情页
		openDetail() {
			// 处于详情页中
			if (this.isdetail) return;
			uni.navigateTo({
				// avigateTo方法携带的参数是有字符串长度限制的,超出部分就无法携带了,这就回导致传递过去的对象不闭合,使用json解析的时候就产生了报错.
				url: '../../pages/detail/detail?detail=' + encodeURIComponent(JSON.stringify(this.item))
			});

			// 加入历史记录
			let list = uni.getStorageSync('history');
			list = list ? JSON.parse(list) : [];
			let index = list.findIndex(v => v.id === this.item.id);
			if (index === -1) {
				list.unshift(this.item);
				uni.setStorageSync('history', JSON.stringify(list));
			}
		},
		// 顶踩操作
		doSupport(type) {
			this.checkAuth(() => {
				this.$H
					.post(
						'/support',
						{
							post_id: this.item.id,
							type: type === 'support' ? 0 : 1
						},
						{
							token: true,
							native: true
						}
					)
					.then(res => {
						if (res.errorCode == '40000') {
							return uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
						// 通知父组件
						uni.$emit('updateFollowOrSupport', {
							type: 'support',
							data: {
								type: type,
								id: this.item.id
							}
						});
					});
			});
		},
		// 评论
		doComment() {
			this.checkAuth(() => {
				if (!this.isdetail) {
					return this.openDetail();
				}
				this.$emit('doComment');
			});
		},
		// 分享
		doShare() {
			if (!this.isdetail) {
				return this.openDetail();
			}
			this.$emit('doShare');
		}
	}
};
</script>

<style>
.support-active {
	color: #ff4a6a;
}
</style>
