<template>
	<view>
		<!-- 消息列表 -->
		<template v-if="list.length">
			<block v-for="(item, index) in list" :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>
		<template v-else>
			<noThing></noThing>
		</template>

		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view
				class="flex align-center justify-center font-md border-bottom py-2"
				hover-class="bg-light"
				@click="popupEvent('friend')"
			>
				<text class="iconfont icon-sousuo mr-2"></text>
				添加好友
			</view>
			<view class="flex align-center justify-center font-md py-2" hover-class="bg-light" @click="popupEvent('clear')">
				<text class="iconfont icon-shanchu mr-2"></text>
				清除列表
			</view>
		</uni-popup>
	</view>
</template>

<script>
import msgList from '@/components/msg/msg-list.vue';
import noThing from '@/components/common/no-thing.vue';
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
import { mapState } from 'vuex';

export default {
	components: {
		msgList,
		noThing,
		uniPopup
	},
	data() {
		return {};
	},
	// 页面加载
	onLoad() {},
	computed: {
		...mapState({
			list: state => state.chatList
		})
	},
	// 监听下拉刷新
	onPullDownRefresh() {
		this.refresh();
	},
	// 监听原生标题栏按钮点击事件
	onNavigationBarButtonTap(e) {
		switch (e.index) {
			case 0: // 左边
				uni.navigateTo({
					url: '../user-list/user-list'
				});
				this.$refs.popup.close();
				break;
			case 1: // 右边
				this.$refs.popup.open('top');
				break;
		}
	},
	methods: {
		// 下拉刷新
		refresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		// 弹出层选项点击事件
		popupEvent(e) {
			switch (e) {
				case 'friend':
					uni.navigateTo({
						url: '../search/search?type=user'
					});
					console.log('添加好友');
					break;
				case 'clear':
					console.log('清除列表');
					break;
			}
			// 关闭弹出层
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="scss"></style>
