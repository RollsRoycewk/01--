<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view>
			<view
				class="iconfont icon-guanbi flex align-center justify-center font-lg"
				style="width: 100rpx; height: 100rpx"
				hover-class="bg-light"
				@click="back"
			></view>
		</view>

		<view class="text-center" style="padding-top: 130rpx; padding-bottom: 70rpx; font-size: 55rpx">
			{{ status ? '手机验证码登录' : '账号密码登录' }}
		</view>

		<view class="px-2">
			<template v-if="!status">
				<view class="mb-2">
					<input v-model="username" type="text" placeholder="昵称/手机号/邮箱" class="border-bottom p-2" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input v-model="password" type="text" placeholder="请输入密码" class="border-bottom p-2 flex-1" />
					<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx">
						忘记密码?
					</view>
				</view>
			</template>

			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2">+86</view>
					<input v-model="phone" type="text" placeholder="手机号" class="border-bottom p-2 flex-1" />
				</view>
				<view class="mb-2 flex align-stretch">
					<input v-model="code" type="text" placeholder="请输入验证码" class="border-bottom p-2 flex-2" />
					<view
						class="border-bottom flex align-center justify-center font-sm text-white bg-main"
						:class="codeTime > 0 ? 'bg-main-disabled' : 'bg-main'"
						style="width: 180rpx"
						@click="getCode"
					>
						{{ codeTime > 0 ? codeTime + 's' : '获取验证码' }}
					</view>
				</view>
			</template>
		</view>

		<view class="py-2 px-3">
			<button
				class="bg-main text-white"
				style="border-radius: 50rpx; border: 0"
				type="primary"
				:disabled="disabled"
				@click="submit"
			>
				登录
			</button>
		</view>

		<view class="flex align-center justify-center pt-2 pb-4">
			<view class="text-primary font-sm" @click="changeStatus">{{ status ? '账号密码登录' : '验证码登陆' }}</view>
			<view class="text-muted mx-2">|</view>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>

		<view class="flex align-center justify-center">
			<view style="height: 1rpx; background-color: #dddddd; width: 100rpx"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx; background-color: #dddddd; width: 100rpx"></view>
		</view>

		<other-login></other-login>

		<view class="flex align-center justify-center text-muted">
			注册即代表同意
			<text class="text-primary">《xxx社区协议》</text>
		</view>
	</view>
</template>

<script>
import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
import otherLogin from '@/components/common/other-login';

export default {
	components: {
		uniStatusBar,
		otherLogin
	},
	data() {
		return {
			status: false,
			username: '',
			password: '',
			phone: '',
			code: '',
			codeTime: 0
		};
	},
	computed: {
		disabled() {
			if ((this.username == '' || this.password == '') && (this.phone == '' || this.code == '')) {
				return true;
			}
			return false;
		}
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		// 初始化表单
		initForm() {
			this.username = '';
			this.password = '';
			this.phone = '';
			this.code = '';
		},
		// 切换登录方式
		changeStatus() {
			// 初始化表单
			this.initForm();
			this.status = !this.status;
		},
		// 获取验证码
		getCode() {
			if (this.codeTime) return;
			// 倒计时
			this.codeTime = 60;
			let timer = setInterval(() => {
				if (this.codeTime >= 1) {
					this.codeTime--;
				} else {
					this.codeTime = 0;
					clearInterval(timer);
				}
			}, 1000);
		},
		// 表单验证
		validate() {
			//手机号正则
			var mPattern = /^1[34578]\d{9}$/;
			if (!mPattern.test(this.phone)) {
				uni.showToast({
					title: '手机号格式不正确',
					icon: 'none'
				});
				return false;
			}
			// ...更多验证
			return true;
		},
		// 提交
		submit() {
			// 表单验证
			if (this.status) {
				if (!this.validate()) return;
			}
			// 提交后端
			this.$H
				.post('/user/login', {
					username: this.username,
					password: this.password
				})
				.then(res => {
					console.log('res', res);
					// 修改vuex的state,持久化存储
					this.$store.commit('login', res);
					// 提示和跳转
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
				})
				.catch(err => {
					// 登录失败
				});
			// 登录成功处理
		}
	}
};
</script>

<style lang="scss"></style>
