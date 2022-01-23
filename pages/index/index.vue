<template>
	<view>
		<block v-for="(item, index) in list" :key="index"><common-list :item="item" :index="index" @follow="follow" @doSupport="doSupport"></common-list></block>
	</view>
</template>

<script>
import commonList from '@/components/common/common-list.vue';

export default {
	components: {
		commonList
	},
	data() {
		return {
			list: [
				{
					username: '昵称',
					userpic: '/static/default.jpg',
					newstime: '2019-10-20 下午04:30',
					isFollow: false,
					title: '我是标题',
					titlepic: '/static/demo/datapic/11.jpg',
					support: {
						type: 'support', // 顶
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_num: 2
				},
				{
					username: '昵称',
					userpic: '/static/default.jpg',
					newstime: '2019-10-20 下午04:30',
					isFollow: false,
					title: '我是标题',
					titlepic: '',
					support: {
						type: 'unsupport', // 踩
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_num: 2
				},
				{
					username: '昵称',
					userpic: '/static/default.jpg',
					newstime: '2019-10-20 下午04:30',
					isFollow: false,
					title: '我是标题',
					titlepic: '',
					support: {
						type: '', // 未操作
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_num: 2
				}
			]
		};
	},
	onLoad() {},
	methods: {
		follow(index) {
			this.list[index].isFollow = true;
			uni.showToast({
				title: '关注成功'
			});
		},
		doSupport(e) {
			// 拿到当前数据对象
			let item = this.list[e.index];
			let msg = e.type === 'support' ? '顶' : '踩';

			// 之前没有操作过
			if (item.support.type === '') {
				item.support[e.type + '_count']++;
			} else if (item.support.type === 'support' && e.type === 'unsupport') {
				// 顶 - 1
				item.support.support_count--;
				// 踩 + 1
				item.support.unsupport_count++;
			} else if (item.support.type === 'unsupport' && e.type === 'support') {
				// 顶 + 1
				item.support.support_count++;
				// 踩 - 1
				item.support.unsupport_count--;
			}
			item.support.type = e.type;
			uni.showToast({ title: msg + '成功' });
		}
	}
};
</script>

<style></style>
