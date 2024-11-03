<template>
	<view class="setting-card">
		<view class="setting-left">
			<slot name="title"></slot>
		</view>
		<view class="setting-right">
			<slot name="item"></slot>
			<uni-icons class="icons" type="right" size="18" color="#a7a7a7"></uni-icons>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.setting-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $bg-color-white;
		padding: 25rpx;
		border-top: 1px solid $text-font-color-5;

		.setting-left {
			padding-left: 15rpx;
		}

		.setting-right {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.icons {
				margin-left: 15rpx;
			}
		}
	}
</style>