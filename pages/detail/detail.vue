<template>
	<view>
		<!-- 帖子详情页详情信息 -->
		<common-list :item="info" isdetail="" @doComment="doComment" @doShare="doShare" @follow="follow"
			@doSupport="doSupport">
			<view>{{info.content}}</view>
			<view class="">
				<image class="w-100" :src="item.url" mode="widthFix" v-for="(item,index) in info.images" :key="index"
					@click="preview(index)"></image>
			</view>
		</common-list>

		<divider></divider>

		<view class="p-2 font-md font-weight-bold">
			最新评论 3
		</view>
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face">
					<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
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
		
	</view>
</template>

<script>
	import commonList from "@/components/common/common-list.vue";
	import bottomInput from "@/components/common/bottom-input.vue";

	export default {
		components: {
			commonList,
			bottomInput
		},
		data() {
			return {
				// 当前帖子信息
				// 当前帖子信息
				info: {
					username: "昵称",
					userpic: "/static/default.jpg",
					newstime: "2019-10-20 下午04:30",
					isFollow: false,
					title: "我是标题",
					titlepic: "/static/demo/datapic/11.jpg",
					support: {
						type: "support", // 顶
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_num: 2,
					content: "帝莎编程学院：uni-app第二季仿商城类实战项目开发，uni-app第二季仿微信实战项目开发",
					images: [{
						url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg"
					}, {
						url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/5.jpg"
					}]
				}
			};
		},
		computed: {
			imagesList() {
				return this.info.images.map(item => item.url)
			}
		},
		onLoad(e) {
			// 初始化
			if (e.detail) {
				this.__init(JSON.parse(e.detail))
			}
		},
		methods: {
			__init(data) {
				// 修改标题
				uni.setNavigationBarTitle({
					title: data.title
				})
				// 请求api
			},
			doComment() {},
			doShare() {
				
			},
			submit(data) {
				console.log("data", data);
			},
			// 预览图片
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.imagesList
				})
			},
			// 关注
			follow() {
				this.info.isFollow = true
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
				let msg = e.type === 'support' ? '顶' : '踩'
				// 之前没有操作过
				if (this.info.support.type === '') {
					this.info.support[e.type + '_count']++
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
				this.info.support.type = e.type
				uni.showToast({
					title: msg
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
