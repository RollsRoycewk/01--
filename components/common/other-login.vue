<template>
	<view class="flex align-center px-5 py-3">
		<view
			v-for="(item, index) in providerList"
			:key="index"
			class="flex align-center justify-center flex-1"
			@click="login(item)"
		>
			<view
				:class="item.icon + ' ' + item.bgColor"
				class="iconfont font-lg text-white flex align-center justify-center rounded-circle"
				style="width: 100rpx; height: 100rpx"
			></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		back: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			providerList: [
				{
					providerName: '微信登录',
					icon: 'icon-weixin',
					bgColor: 'bg-success',
					id: 'weixin'
				},
				{
					providerName: 'QQ登录',
					icon: 'icon-QQ',
					bgColor: 'bg-primary',
					id: 'qq'
				},
				{
					providerName: '新浪微博登录',
					icon: 'icon-xinlangweibo',
					bgColor: 'bg-warning',
					id: 'sinaweibo'
				}
			]
		};
	},
	methods: {
		// 登录
		login(item) {
			console.log(item);
			uni.login({
				provider: item.id,
				success: res => {
					console.log(res);
					/*
						{
							"authResult": {
								"access_token": "28_ceqdzxESqQwYEFKp6LjgHZkUxkMpF6MqvCi0gr-Spwurp87utuxkHTr0nZFh7-TNZTQ4ds5ufnRoGnLsFw59NLWPWs3MNrZpOg1IsoQmfoE",
								"expires_in": 7200,
								"refresh_token": "28_FAqK9VRNebbvKiEBgG3V9lC5NHEGRuhnoXS3pkGdE3M2GTPmd2eVFWBRNbcAwF5heXPb4RWMmCXeYJOiaTUzn0TlXIcD4xFO3CnkShN5ObU",
								"openid": "oRrdQt3HS3Ns2TFCVLMOyxbR9DcM",
								"scope": "snsapi_userinfo",
								"unionid": "oU5Yytz7ielo7Xw00LMgZsPeSDkQ"
							},
							"errMsg": "login:ok"
						}
						*/
					// 获取用户信息
					uni.getUserInfo({
						provider: item.id,
						success: infoRes => {
							let obj = {
								provider: item.id,
								openid: infoRes.userInfo.openId,
								expires_in: 0,
								nickName: infoRes.userInfo.nickName,
								avatarUrl: infoRes.userInfo.avatarUrl
							};
							this.loginEvent(obj);
						}
					});
				},
				fail: () => {
					uni.showToast({
						title: '登录失败',
						icon: 'none'
					});
				}
			});
		},
		// 登录逻辑
		loginEvent(data) {
			this.$H.post('/user/otherlogin', data).then(res => {
				// 修改vuex的state,持久化存储
				this.$store.commit('login', this.$U.formatUserinfo(res));
				// 返回上一页
				if (this.back) {
					uni.navigateBack({
						delta: 1
					});
				}
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
			});
		}
	}
};
</script>

<style></style>
