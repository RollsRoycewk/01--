<template>
	<view>
		<topic-info :info="info"></topic-info>
		<divider></divider>
	</view>
</template>

<script>
	import topicInfo from "@/components/topic-detail/topic-info.vue";
	
	export default {
		components:{
			topicInfo
		},
		data() {
			return {
				info: {
					cover: "/static/demo/topicpic/1.jpeg",
					title: "话题名称",
					desc: "话题描述",
					today_count: 0,
					news_count: 10
				}
			}
		},
		onLoad(e) {
			if (e.detail) {
				let res = JSON.parse(e.detail)
				console.log(res);
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.filter {
		/*  
	   filter(滤镜) 属性
	   blur 给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；
	  */
		filter: blur(10px);
	}
</style>
