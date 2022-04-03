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

		<view class="p-2 font-md font-weight-bold">
			最新评论 3
		</view>
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face">
					<image src="../../static/default.jpg" mode="widthFix"></image>
				</view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>小猫咪</text>
					</view>
					<view class="uni-comment-content">支持国产，支持DCloud!</view>
					<view class="uni-comment-date">
						<view>2天前</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input @submit="submit"></bottom-input>

		<!-- 分享 -->
		<more-share ref="share"></more-share>
	</view>
</template>

<script>
import commonList from '@/components/common/common-list.vue';
import bottomInput from '@/components/common/bottom-input.vue';
import moreShare from '@/components/common/more-share.vue';

export default {
	components: {
		commonList,
		bottomInput,
		moreShare
	},
	data() {
		return {
			// 当前帖子信息
			info: {}
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
		}
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
		},
		doComment() {},
		doShare() {
			this.$refs.share.open();
		},
		submit(data) {
			console.log('data', data);
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
		}
	}
};
</script>

<style lang="scss"></style>
