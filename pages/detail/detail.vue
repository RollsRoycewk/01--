<template>
	<view>
		<!-- 帖子详情页详情信息 -->
		<common-list
			:item="info"
			isdetail=""
			@doComment="doComment"
			@doShare="doShare"
			@follow="follow"
			@doSupport="doSupport"
		>
			<view>{{ info.content }}</view>
			<view class="">
				<image
					v-for="(item, index) in info.images"
					:key="index"
					class="w-100"
					:src="item.url"
					mode="widthFix"
					@click="preview(index)"
				></image>
			</view>
		</common-list>

		<divider></divider>

		<view class="p-2 font-md font-weight-bold">最新评论 {{ info.comment_count }}</view>
		<view class="px-2">
			<view v-for="(item, index) in comments" :key="index" class="uni-comment-list">
				<view v-if="item.fid" style="width: 60rpx;"></view>
				<view class="flex w-100" :class="item.fid ? 'bg-light rounded p-2' : ''">
					<view class="uni-comment-face"><image :src="item.userpic"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{ item.username }}</text>
						</view>
						<view class="uni-comment-content" @click="reply(item.id)">{{ item.data }}</view>
						<view class="uni-comment-date">
							<view>{{ item.time }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input :focus="focus" @blur="blur" @submit="submit"></bottom-input>

		<!-- 分享 -->
		<more-share ref="share"></more-share>
	</view>
</template>

<script>
import commonList from '@/components/common/common-list.vue';
import bottomInput from '@/components/common/bottom-input.vue';
import moreShare from '@/components/common/more-share.vue';
import $T from '@/common/time.js';

export default {
	components: {
		commonList,
		bottomInput,
		moreShare
	},
	data() {
		return {
			// 当前帖子信息
			info: {},
			comments: [],
			focus: false,
			reply_id: 0
		};
	},
	computed: {
		imagesList() {
			return this.info.images.map(item => item.url);
		}
	},
	onLoad(e) {
		// 初始化
		if (e.detail) {
			this.__init(JSON.parse(decodeURIComponent(e.detail)));

			// 监听关注和顶踩操作
			uni.$on('updateFollowOrSupport', e => {
				switch (e.type) {
					case 'follow': // 关注
						this.follow(e.data.user_id);
						break;
					case 'support': // 顶踩
						this.doSupport(e.data);
						break;
				}
			});
		}
	},
	onUnload() {
		// 如果没有回调,会清除所有事件
		uni.$off('updateFollowOrSupport', e => {});
	},
	onNavigationBarButtonTap() {
		this.$refs.share.open();
	},
	onBackPress() {
		this.$refs.share.close();
	},
	methods: {
		__init(data) {
			// 修改标题
			uni.setNavigationBarTitle({
				title: data.title
			});
			this.info = data;
			this.info.content = '';

			// 请求api
			this.$H.get('/post/' + this.info.id).then(res => {
				this.info.content = res.detail.content;
			});

			// 获取评论
			this.getComments();
		},
		doComment() {},
		doShare() {
			this.$refs.share.open();
		},
		// 提交评论
		submit(data) {
			if (data === '') {
				return uni.showToast({
					title: '评论不能为空',
					icon: 'none'
				});
			}
			uni.showLoading({
				title: '评论中...',
				mask: false
			});
			this.$H
				.post(
					'/post/comment',
					{
						fid: this.reply_id,
						data: data,
						post_id: this.info.id
					},
					{
						token: true
					}
				)
				.then(res => {
					uni.hideLoading();
					this.getComments();
				})
				.catch(err => {
					uni.hideLoading();
				});
		},
		// 预览图片
		preview(index) {
			uni.previewImage({
				current: index,
				urls: this.imagesList
			});
		},
		// 关注
		follow() {
			this.info.isFollow = true;
			uni.showToast({
				title: '关注成功'
			});
		},
		// 顶踩操作
		doSupport(e) {
			// 之前操作过
			if (this.info.support.type === e.type) {
				return uni.showToast({
					title: '你已经操作过了',
					icon: 'none'
				});
			}
			let msg = e.type === 'support' ? '顶' : '踩';
			// 之前没有操作过
			if (this.info.support.type === '') {
				this.info.support[e.type + '_count']++;
			} else if (this.info.support.type === 'support' && e.type === 'unsupport') {
				// 顶 - 1
				this.info.support.support_count--;
				// 踩 + 1
				this.info.support.unsupport_count++;
			} else if (this.info.support.type === 'unsupport' && e.type === 'support') {
				// 顶 + 1
				this.info.support.support_count++;
				// 踩 - 1
				this.info.support.unsupport_count--;
			}
			this.info.support.type = e.type;
			uni.showToast({
				title: msg
			});
		},
		// 获取评论列表
		getComments() {
			this.$H.get('/post/' + this.info.id + '/comment').then(res => {
				this.comments = this.__ArrSort(res.list);
				this.info.comment_count = this.comments.length;
				uni.$emit('updateCommentsCount', {
					id: this.info.id,
					count: this.info.comment_count
				});
			});
		},
		// 重新整理评论格式
		__ArrSort(arr, id = 0) {
			var temp = [],
				lev = 0;
			var forFn = function(arr, id, lev) {
				for (var i = 0; i < arr.length; i++) {
					var item = arr[i];
					if (item.fid == id) {
						item.lev = lev;
						temp.push({
							id: item.id,
							fid: item.fid,
							userid: item.user.id,
							userpic: item.user.userpic,
							username: item.user.username,
							time: $T.gettime(item.create_time),
							data: item.data
						});
						forFn(arr, item.id, lev + 1);
					}
				}
			};
			forFn(arr, id, lev);
			return temp;
		},
		// 回复评论
		reply(id) {
			this.reply_id = id;
			this.focus = true;
		},
		// 输入框失去焦点
		blur() {
			this.reply_id = 0;
			this.focus = false;
		}
	}
};
</script>

<style lang="scss"></style>
