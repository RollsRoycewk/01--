<template>
	<view>
		<!-- 头部 -->
		<view class="flex p-3 border-bottom border-light-secondary">
			<image :src="userinfo.userpic" style="width: 180rpx;height: 180rpx;" class="rounded-circle"></image>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex align-center">
					<view
						v-for="(item, index) in counts"
						:key="index"
						class="flex-1 flex flex-column align-center justify-center"
					>
						<text class="font-lg font-weight-bold">{{ item.num | formatNum }}</text>
						<text class="font text-muted">{{ item.name }}</text>
					</view>
				</view>
				<view class="flex justify-center align-center">
					<button v-if="user_id == user.id" type="default" size="mini" style="width: 400rpx;" @click="openUserInfo">
						编辑资料
					</button>

					<button
						v-else
						type="default"
						size="mini"
						:class="userinfo.isFollow ? 'bg-light text-dark' : 'bg-main'"
						style="width: 400rpx;"
						@click="doFollow"
					>
						{{ userinfo.isFollow ? '已关注' : '关注' }}
					</button>
				</view>
			</view>
		</view>

		<!-- tab -->
		<view class="flex align-center" style="height: 100rpx">
			<view
				v-for="(item, index) in tabBars"
				:key="index"
				class="flex-1 flex align-center justify-center"
				:class="index === tabIndex ? 'font-lg font-weight-bold text-main' : 'font-md'"
				@click="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</view>

		<template v-if="tabIndex === 0">
			<view class="animated fast fadeIn">
				<view class="p-3 border-bottom">
					<view class="font-md">账号信息</view>
					<view class="font">账号年龄:{{ userinfo.regtime }}</view>
					<view class="font">账号id:{{ user_id }}</view>
				</view>
				<view class="p-3 border-bottom">
					<view class="font-md">个人信息</view>
					<view class="font">星座:{{ userinfo.birthday }}</view>
					<view class="font">职业:{{ userinfo.job }}</view>
					<view class="font">故乡:{{ userinfo.path }}</view>
					<view class="font">情感:{{ userinfo.qg }}</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="animated fast fadeIn">
				<common-list
					v-for="(item, index) in list"
					:key="index"
					:item="item"
					:index="index"
					@follow="follow"
					@doSupport="doSupport"
				></common-list>
				<divider></divider>
				<load-more :loadmore="loadmore"></load-more>
			</view>
		</template>

		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="flex align-center justify-center font-md border-bottom py-2" hover-class="bg-light" @click="doBlack">
				<text class="iconfont icon-sousuo mr-2"></text>
				{{ userinfo.isblack ? '移出黑名单' : '加入黑名单' }}
			</view>
			<view class="py-2 flex align-center justify-center font-md border-bottom" hover-class="bg-light" @click="open">
				<text class="iconfont icon-sousuo mr-2"></text>
				聊天
			</view>
		</uni-popup>
	</view>
</template>

<script>
const emotionArray = ['保密', '未婚', '已婚'];

import commonList from '@/components/common/common-list.vue';
import loadMore from '@/components/common/load-more.vue';
import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
import $T from '@/common/time.js';
import { mapState } from 'vuex';

export default {
	components: {
		commonList,
		loadMore,
		uniPopup
	},
	filters: {
		formatNum(value) {
			return value > 99 ? '99+' : value;
		}
	},
	data() {
		return {
			tabIndex: 0,
			tabBars: [
				{
					name: '主页'
				},
				{
					name: '帖子',
					list: [],
					// 1.上拉加载更多  2.加载中... 3.没有更多了
					loadmore: '上拉加载更多',
					page: 1
				},
				{
					name: '动态',
					list: [],
					// 1.上拉加载更多  2.加载中... 3.没有更多了
					loadmore: '上拉加载更多',
					page: 1
				}
			],
			user_id: '',
			userinfo: {},
			counts: [
				{
					name: '帖子',
					num: 0
				},
				{
					name: '关注',
					num: 0
				},
				{
					name: '粉丝',
					num: 0
				}
			]
		};
	},
	onLoad(e) {
		if (!e.user_id) {
			return uni.showToast({
				title: '非法参数',
				icon: 'none'
			});
		}
		this.user_id = e.user_id;
		// 加载用户个人信息
		this.getUserInfo();
		// 获取用户相关数据
		this.getCounts();
		// 监听关注和顶踩操作
		uni.$on('updateFollowOrSupport', e => {
			switch (e.type) {
				case 'follow': // 关注
					this.follow(e.data.user_id);
					break;
				case 'support': // 顶踩
					this.doSupport(e.data);
					break;
			}
		});
		// 监听评论数变化
		uni.$on('updateCommentsCount', ({ id, count }) => {
			this.tabBars.forEach(tab => {
				if (tab.list) {
					tab.list.forEach(item => {
						if (item.id === id) {
							item.comment_count = count;
						}
					});
				}
			});
		});
	},
	onUnload() {
		uni.$off('updateFollowOrSupport', e => {});
		uni.$off('updateCommentsCount', e => {});
	},
	onNavigationBarButtonTap() {
		if (this.user_id == this.user.id) {
			return uni.navigateTo({
				url: '../user-set/user-set'
			});
		}
		this.$refs.popup.open();
	},
	computed: {
		...mapState({
			user: state => state.user
		}),
		list() {
			return this.tabBars[this.tabIndex].list;
		},
		loadmore() {
			return this.tabBars[this.tabIndex].loadmore;
		}
	},
	methods: {
		// 获取用户相关数据
		getCounts() {
			this.$H.get('/user/getcounts/' + this.user_id).then(res => {
				this.counts[0].num = res.post_count;
				this.counts[1].num = res.withfollow_count;
				this.counts[2].num = res.withfen_count;
			});
		},
		// 获取用户个人信息
		getUserInfo() {
			this.$H
				.post(
					'/getuserinfo',
					{
						user_id: this.user_id
					},
					{
						token: true,
						notoast: true
					}
				)
				.then(res => {
					this.userinfo = {
						userpic: res.userpic,
						username: res.username,
						sex: res.userinfo.sex,
						age: res.userinfo.age,
						isFollow: res.fens.length > 0,
						isblack: res.blacklist.length > 0,
						regtime: $T.dateFormat(new Date(res.create_time * 1000), '{Y}-{MM}-{DD}'),
						birthday: $T.getHoroscope(res.userinfo.birthday),
						job: res.userinfo.job ? res.userinfo.job : '无',
						path: res.userinfo.path ? res.userinfo.path : '无',
						qg: emotionArray[res.userinfo.qg]
					};
					uni.setNavigationBarTitle({
						title: this.userinfo.username
					});
				});
		},
		changeTab(index) {
			this.tabIndex = index;
			this.getList();
		},
		// 关注
		follow(user_id) {
			// 找到当前作者的所有列表
			this.tabBars.forEach(tab => {
				if (tab.list) {
					tab.list.forEach(item => {
						if (item.user_id === user_id) {
							item.isFollow = true;
						}
					});
				}
			});
			uni.showToast({ title: '关注成功' });
		},
		// 顶踩操作
		doSupport(e) {
			// 拿到当前的选项卡对应的list
			this.tabBars[this.tabIndex].list.forEach(item => {
				if (item.id === e.id) {
					// 之前没有操作过
					if (item.support.type === '') {
						item.support[e.type + '_count']++;
					} else if (item.support.type === 'support' && e.type === 'unsupport') {
						// 顶 - 1
						item.support.support_count--;
						// 踩 + 1
						item.support.unsupport_count++;
					} else if (item.support.type === 'unsupport' && e.type === 'support') {
						// 之前踩了
						// 顶 + 1
						item.support.support_count++;
						// 踩 - 1
						item.support.unsupport_count--;
					}
					item.support.type = e.type;
				}
			});
			let msg = e.type === 'support' ? '顶' : '踩';
			uni.showToast({ title: msg + '成功' });
		},
		// 获取文章列表
		getList() {
			let index = this.tabIndex;
			let page = this.tabBars[index].page;
			let isrefresh = page === 1;
			this.$H
				.get('/user/' + this.user_id + '/post/' + page)
				.then(res => {
					let list = res.list.map(v => {
						return this.$U.formatCommonList(v);
					});
					this.tabBars[index].list = isrefresh ? [...list] : [...this.tabBars[index].list, ...list];
					this.tabBars[index].loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多';
				})
				.catch(err => {
					if (!isrefresh) {
						this.tabBars[index].page--;
					}
				});
		},
		// 关注/取消关注
		doFollow() {
			this.checkAuth(() => {
				let url = this.userinfo.isFollow ? '/unfollow' : '/follow';
				let msg = this.userinfo.isFollow ? '取消关注' : '关注';
				this.$H
					.post(
						url,
						{
							follow_id: this.user_id
						},
						{
							token: true
						}
					)
					.then(res => {
						this.userinfo.isFollow = !this.userinfo.isFollow;
						uni.showToast({
							title: msg + '成功',
							icon: 'none'
						});
						uni.$emit('updateIndex');
						this.getList();
					});
			});
		},
		// 进入编辑资料
		openUserInfo() {
			uni.navigateTo({
				url: '../user-userinfo/user-userinfo'
			});
		},
		// 加入/移出黑名单
		doBlack() {
			this.checkAuth(() => {
				let url = this.userinfo.isblack ? '/removeblack' : '/addblack';
				let msg = this.userinfo.isblack ? '移出黑名单' : '加入黑名单';
				uni.showModal({
					content: '是否要' + msg,
					success: res => {
						if (res.confirm) {
							this.$H
								.post(
									url,
									{
										id: this.user_id
									},
									{
										token: true
									}
								)
								.then(res => {
									this.userinfo.isblack = !this.userinfo.isblack;
									uni.showToast({
										title: msg + '成功',
										icon: 'none'
									});
								});
						}
					}
				});
			});
		},
		open() {
			let user = {
				user_id: this.user_id,
				username: this.userinfo.username,
				userpic: this.userinfo.userpic
			};

			uni.navigateTo({
				url: '../../pages/user-chat/user-chat?user=' + JSON.stringify(user),
				success: () => {
					// 清除未读数，更新底部导航消息数显示
					this.$store.dispatch('readChatMessage', user);
				}
			});
		}
	}
};
</script>

<style lang="scss"></style>
