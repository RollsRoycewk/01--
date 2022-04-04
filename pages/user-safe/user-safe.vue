<template>
	<view>
		<uni-list-item v-for="(item, index) in list" :key="index" :title="item.name" @click="handleEvent(item)">
			<view slot="right" class="flex align-center text-right text-light-muted">
				{{ item.data }}
			</view>
		</uni-list-item>
	</view>
</template>

<script>
import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
import { mapState } from 'vuex';

export default {
	components: {
		uniListItem
	},
	onShow() {
		let list = [
			{
				name: '手机号',
				data: this.user.phone ? this.user.phone : '未绑定',
				type: 'navigateTo',
				url: '/pages/user-phone/user-phone'
			},
			{
				name: '登录密码',
				data: this.user.password ? '修改密码' : '未设置',
				type: 'navigateTo',
				url: '/pages/user-password/user-password'
			},
			{
				name: '邮箱绑定',
				data: this.user.email ? this.user.email : '未绑定',
				type: 'navigateTo',
				url: '/pages/user-email/user-email'
			}
		];
		this.list = [...list];
	},
	data() {
		return {
			list: []
		};
	},
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	methods: {
		handleEvent(item) {
			if (item.type === '') return;

			switch (item.type) {
				case 'navigateTo':
					uni.navigateTo({
						url: item.url
					});
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style lang="scss"></style>
