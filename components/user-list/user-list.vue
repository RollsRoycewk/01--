<template>
	<view class="flex align-center border-bottom border-light-secondary p-2">
		<image src="/static/default.jpg" style="width: 100rpx;height: 100rpx;" class="rounded-circle mr-2"></image>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">{{ item.username }}</text>
			<uni-badge text="24" :type="item.sex === 1 ? 'error' : 'primary'" size="small">
				<text
					v-if="item.sex > 0"
					class="iconfont text-white font-sm"
					:class="item.sex === 1 ? 'icon-nv' : 'icon-nan'"
					style="margin-right: 5rpx;"
				></text>
			</uni-badge>
		</view>
		<view class="uni-icon uni-icon-checkbox-filled" :class="item.isFollow ? 'text-light-muted' : 'text-main'"></view>
	</view>
</template>

<script>
import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue';

export default {
	components: {
		uniBadge
	},
	props: {
		item: Object,
		index: Number
	}
};
</script>

<style></style>
