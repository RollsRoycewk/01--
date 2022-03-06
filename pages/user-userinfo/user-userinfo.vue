<template>
	<view>
		<uni-list-item title="头像" @click="changeUserpic">
			<view class="flex align-center" slot="right">
				<image :src="userpic" style="width: 100rpx;height: 100rpx;" class="rounded-circle"></image>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view class="flex align-center" slot="right">
				<input class="uni-input text-right" type="text" v-model="username" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" @click="changeSex">
			<view class="flex align-center" slot="right">
				<text>{{sexText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<picker mode="date" :value="birthday" @change="onDateChange">
			<uni-list-item title="生日">
				<view class="flex align-center" slot="right">
					<text>{{birthday}}</text>
					<text class="iconfont icon-bianji1 ml-2"></text>
				</view>
			</uni-list-item>
		</picker>
		<uni-list-item title="情感" @click="changeEmotion">
			<view class="flex align-center" slot="right">
				<text>{{emotionText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="职业" @click="changeJob">
			<view class="flex align-center" slot="right">
				<text>{{job}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="家乡" @click="showCityPicker">
			<view class="flex align-center" slot="right">
				<text>{{pickerText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>

		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary">完成</button>
		</view>

		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			@onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	const sexArray = ['保密', '男', '女']
	const emotionArray = ['保密', '未婚', '已婚']

	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
	import mpvueCityPicker from "@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"

	export default {
		components: {
			uniListItem,
			mpvueCityPicker
		},
		data() {
			return {
				// 用户头像
				userpic: "/static/default.jpg",
				username: "",
				sex: 0,
				emotion: 0,
				job: "保密",
				birthday: "2022-03-05",
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
			};
		},
		computed: {
			sexText() {
				return sexArray[this.sex]
			},
			emotionText() {
				return emotionArray[this.emotion]
			}
		},
		// 监听返回
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		// 监听页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		methods: {
			showCityPicker() {
				this.$refs.mpvueCityPicker.show()
			},
			// 三级联动提交事件
			onConfirm(e) {
				this.pickerText = e.label
			},
			// 修改生日
			onDateChange(e) {
				this.birthday = e.detail.value;
			},
			// 修改用户头像
			changeUserpic() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						this.userpic = res.tempFilePaths[0];
					}
				})
			},
			// 修改性别
			changeSex() {
				uni.showActionSheet({
					itemList: sexArray,
					success: (res) => {
						this.sex = res.tapIndex;
					}
				})
			},
			// 修改情感
			changeEmotion() {
				uni.showActionSheet({
					itemList: emotionArray,
					success: (res) => {
						this.emotion = res.tapIndex;
					}
				})
			},
			// 修改职业
			changeJob() {
				let JobArray = ['IT', '教师', '农名']
				uni.showActionSheet({
					itemList: JobArray,
					success: (res) => {
						this.job = JobArray[res.tapIndex]
					}
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
