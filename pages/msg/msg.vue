<template>
	<view>
		<!-- 消息列表 -->
		<block v-for="(item,index) in list" :key="index">
			<msg-list :item="item" :index="index"></msg-list>
		</block>
	</view>
</template>

<script>
	import msgList from "@/components/msg/msg-list.vue";

	export default {
		components: {
			msgList
		},
		data() {
			return {
				list: [{
					avatar: "/static/default.jpg",
					username: "聊天信息",
					update_time: 1570718427,
					data: "聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊",
					noread: 20
				}, {
					avatar: "/static/default.jpg",
					username: "聊天信息",
					update_time: 1570718427,
					data: "聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊",
					noread: 20
				}, {
					avatar: "/static/default.jpg",
					username: "聊天信息",
					update_time: 1570718427,
					data: "聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊",
					noread: 20
				}, {
					avatar: "/static/default.jpg",
					username: "聊天信息",
					update_time: 1570718427,
					data: "聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊聊天信息啊啊",
					noread: 20
				}]
			};
		}
	}
</script>

<style lang="scss">

</style>
