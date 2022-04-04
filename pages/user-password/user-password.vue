<template>
	<view>
		<input v-if="user.password" v-model="oldpassword" type="text" value="" class="uni-input" placeholder="输入旧密码" />
		<input v-model="newpassword" type="text" value="" class="uni-input" placeholder="输入新密码" />
		<input v-model="renewpassword" type="text" value="" class="uni-input" placeholder="输入确认密码" />

		<view class="py-2 px-3">
			<button
				class="bg-main text-white"
				style="border-radius: 50rpx;border: 0;"
				type="primary"
				:disabled="disabled"
				:class="disabled ? 'bg-main-dosabled' : ''"
				@click="submit"
			>
				设置
			</button>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			oldpassword: '  ',
			newpassword: '',
			renewpassword: ''
		};
	},
	computed: {
		...mapState({
			user: state => state.user
		}),
		disabled() {
			if (this.user.password) {
				return this.oldpassword == '' || this.newpassword == '' || this.renewpassword == '';
			}
			return this.newpassword == '' || this.renewpassword == '';
		}
	},
	methods: {
		// 验证
		check() {
			if (this.newpassword !== this.renewpassword) {
				uni.showToast({
					title: '两次密码不一致',
					icon: 'none'
				});
				return false;
			}
			return true;
		},
		submit() {
			if (!this.check()) {
				return;
			}
			this.$H
				.post(
					'/repassword',
					{
						oldpassword: this.oldpassword,
						newpassword: this.newpassword,
						renewpassword: this.renewpassword
					},
					{
						token: true
					}
				)
				.then(res => {
					this.$store.commit('editUserInfo', {
						key: 'password',
						value: true
					});
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '修改密码成功',
						icon: 'none'
					});
				});
		}
	}
};
</script>

<style lang="scss"></style>
