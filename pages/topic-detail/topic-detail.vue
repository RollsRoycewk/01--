<template>
	<view>
		<topic-info :info="info"></topic-info>
		<divider></divider>

		<view class="p-2 flex align-center border-bottom" hover-class="bg-light
		" v-for="(item,index) in hotList" :key="index">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="font text-dark text-ellipsis">{{item.title}}</text>
		</view>
		<divider></divider>

		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex align-center flex-1 justify-center" v-for="(item,index) in tabBars" :key="index"
				:class="index === tabIndex ? 'font-lg font-weight-bold text-main' : 'font-md'"
				@click="changeTab(index)">{{item.name}}</view>
		</view>
		
		<!-- 列表 -->
		<block v-for="(item,index) in list1" :key="index">
			<common-list :item="item" :index="index"></common-list>
		</block>
	</view>
</template>

<script>
	const demo = [{
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
			share_num: 2
		},
		{
			username: "昵称",
			userpic: "/static/default.jpg",
			newstime: "2019-10-20 下午04:30",
			isFollow: false,
			title: "我是标题",
			titlepic: "",
			support: {
				type: "unsupport", // 踩
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 2,
			share_num: 2
		},
		{
			username: "昵称",
			userpic: "/static/default.jpg",
			newstime: "2019-10-20 下午04:30",
			isFollow: false,
			title: "我是标题",
			titlepic: "",
			support: {
				type: "", // 未操作
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 2,
			share_num: 2
		}
	];

	import topicInfo from "@/components/topic-detail/topic-info.vue";
	import commonList from "@/components/common/common-list.vue"

	export default {
		components: {
			topicInfo,
			commonList
		},
		data() {
			return {
				info: {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				},
				hotList: [{
					title: "【新人必读】uni-app实战第二季商城类项目开发"
				}, {
					title: "【新人必读】uni-app实战第三季仿微信项目开发"
				}],
				tabIndex: 0,
				tabBars: [{
					name: "默认"
				}, {
					name: "最新"
				}],
				list1:[]
			}
		},
		onLoad(e) {
			if (e.detail) {
				let res = JSON.parse(e.detail)
				console.log(res);
			}
			this.list1 = demo
		},
		methods: {
			// tab切换
			changeTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
