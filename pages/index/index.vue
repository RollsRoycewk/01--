<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x scroll-with-animation :scroll-into-view="scrollInto" class="scroll-row" style="height: 100rpx;">
			<view
				class="scroll-row-item px-3 py-2 font-md"
				:id="'tab' + index"
				:class="[tabIndex === index ? 'text-main font-weight-bold font-lg' : '']"
				v-for="(item, index) in tabBars"
				:key="index"
				@click="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<swiper-item v-for="(item, index) in newsList" :key="index">
				<scroll-view scroll-y :style="'height:' + scrollH + 'px;'">
					<block v-for="(v, i) in item.list" :key="i">
						<!-- 列表样式 -->
						<common-list :item="v" :index="i" @follow="follow" @doSupport="doSupport"></common-list>
						<!-- 全局分割线 -->
						<divider></divider>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import commonList from '@/components/common/common-list.vue';
import divider from '@/components/common/divider';

export default {
	components: {
		commonList,
		divider
	},
	data() {
		return {
			scrollH: 200,
			tabIndex: 0,
			scrollInto: '',
			tabBars: [
				{
					name: '关注'
				},
				{
					name: '推荐'
				},
				{
					name: '体育'
				},
				{
					name: '热点'
				},
				{
					name: '财经'
				},
				{
					name: '娱乐'
				},
				{
					name: '军事'
				},
				{
					name: '历史'
				},
				{
					name: '本地'
				}
			],
			newsList: [
				{
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
						},
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
							titlepic: '/static/demo/datapic/11.jpg',
							support: {
								type: 'support', // 顶
								support_count: 1,
								unsupport_count: 2
							},
							comment_count: 2,
							share_num: 2
						}
					]
				},
				{
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
						},
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
							titlepic: '/static/demo/datapic/11.jpg',
							support: {
								type: 'support', // 顶
								support_count: 1,
								unsupport_count: 2
							},
							comment_count: 2,
							share_num: 2
						}
					]
				},
				{
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
						},
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
							titlepic: '/static/demo/datapic/11.jpg',
							support: {
								type: 'support', // 顶
								support_count: 1,
								unsupport_count: 2
							},
							comment_count: 2,
							share_num: 2
						}
					]
				},
				{
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
						},
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
							titlepic: '/static/demo/datapic/11.jpg',
							support: {
								type: 'support', // 顶
								support_count: 1,
								unsupport_count: 2
							},
							comment_count: 2,
							share_num: 2
						}
					]
				},
				{
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
						},
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
							titlepic: '/static/demo/datapic/11.jpg',
							support: {
								type: 'support', // 顶
								support_count: 1,
								unsupport_count: 2
							},
							comment_count: 2,
							share_num: 2
						}
					]
				},
				{
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
						},
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
							titlepic: '/static/demo/datapic/11.jpg',
							support: {
								type: 'support', // 顶
								support_count: 1,
								unsupport_count: 2
							},
							comment_count: 2,
							share_num: 2
						}
					]
				},
				{
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
						},
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
							titlepic: '/static/demo/datapic/11.jpg',
							support: {
								type: 'support', // 顶
								support_count: 1,
								unsupport_count: 2
							},
							comment_count: 2,
							share_num: 2
						}
					]
				},
				{
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
				},
				{
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
				}
			]
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(100);
			}
		});
	},
	methods: {
		// 监听滑动
		onChangeTab(e) {
			this.changeTab(e.detail.current);
		},
		// 切换选项
		changeTab(index) {
			if (this.tabIndex === index) return;
			this.tabIndex = index;
			// 滚动到指定元素
			this.scrollInto = 'tab' + index;
		},
		// 关注
		follow(index) {
			this.list[index].isFollow = true;
			uni.showToast({
				title: '关注成功'
			});
		},
		// 顶踩操作
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
