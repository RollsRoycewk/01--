<template>
	<view>
		<!-- 消息列表 -->
		<template v-if="list.length">
			<block v-for="(item,index) in list" :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>
		<template v-else>
			<noThing></noThing>
		</template>
	</view>
</template>

<script>
	const demo = [{
		avatar: "/static/default.jpg",
		username: "帝莎编程",
		update_time: 1570718427,
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		username: "帝莎编程",
		update_time: 1570718427,
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		username: "帝莎编程",
		update_time: 1570718427,
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		username: "帝莎编程",
		update_time: 1570718427,
		data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
		noread: 20
	}];


	import msgList from "@/components/msg/msg-list.vue";
	import noThing from "@/components/common/no-thing.vue"

	export default {
		components: {
			msgList,
			noThing
		},
		data() {
			return {
				list: []
			};
		},
		// 页面加载
		onLoad() {
			this.list = demo;
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				setTimeout(() => {
					this.list = demo;
					uni.stopPullDownRefresh();
				}, 2000)
			}
		}
	}
</script>

<style lang="scss">

</style>
