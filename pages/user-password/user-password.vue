<template>
	<view>
		<input type="text" value="" class="uni-input" placeholder="输入旧密码" v-model="oldpassword" />
		<input type="text" value="" class="uni-input" placeholder="输入新密码" v-model="newpassword" />
		<input type="text" value="" class="uni-input" placeholder="输入确认密码" v-model="renewpassword" />

		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="submit" :disabled="disabled" :class="disabled ? 'bg-main-dosabled' : ''">设置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpassword: "",
				newpassword: "",
				renewpassword: ""
			};
		},
		computed:{
			disabled(){
				return this.oldpassword == '' || this.newpassword == '' || this.renewpassword == ''
			}
		},
		methods: {
			// 验证
			check() {
				if (this.newpassword !== this.renewpassword) {
					uni.showToast({
						title: "两次密码输入不一致",
						icon: "none"
					})
					return false
				}
				return true
			},
			submit(){
				if(!this.check()){
					return
				}
				console.log("提交成功");
			}
		}
	}
</script>

<style lang="scss">

</style>
