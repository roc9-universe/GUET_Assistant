<script setup>
	const data =
		"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你"
</script>

<template>
	<view class="qa-box">
		<view class="qa-body">
			<view v-for="index in 10" :key="index" class="qa-item" :class="index % 2 === 0? 'qa-item-user': ''">
				<image class="qa-avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				<view class="qa-content"> <text>{{data}}</text> </view>
			</view>

		</view>

		<view class="qa-footer">
			<textarea class="qa-input" placeholder="请输入询问的问题" auto-height />
			<button class="qa-button" size="mini" hover-class="is-hover">发送</button>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	// #ifdef H5
	page {
		height: 100%;
	}

	// #endif

	.qa-box {
		width: 100%;
		// #ifdef H5
		height: 100%;
		// #endif
		// #ifndef H5
		height: calc(100vh - constant(safe-area-inset-bottom));
		height: calc(100vh - env(safe-area-inset-bottom));
		// #endif
		overflow: hidden;
		background-color: $bg-color-grey;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.qa-body {
			height: 100%;
			overflow: auto;
			padding: $page-padding;

			.qa-item {
				display: flex;
				margin-bottom: 50rpx;

				.qa-avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.qa-content {
					margin-left: 20rpx;
					width: 80%;
					padding: 20rpx;
					border-radius: 15rpx;
					background-color: $bg-color-qa;
				}
			}

			// 问答项为用户
			.qa-item-user {
				flex-direction: row-reverse;

				.qa-content {
					margin-right: 20rpx;
					background-color: $input-bg-color;
				}
			}
		}

		.qa-footer {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding: $page-padding;
			background-color: $uni-bg-color-grey;
			border-top: 1px solid $border-color;

			.qa-input {
				width: 100%;
				padding: 12rpx 15rpx;
				border-radius: 10rpx;
				background-color: $input-bg-color;
				max-height: 400rpx;
				overflow-y: auto;
			}

			.qa-button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 140rpx;
				margin-left: 15rpx;
				padding: 4rpx 1.34em;
				background-color: $brand-theme-color;
				color: white;
			}

			.is-hover {
				background-color: darken($brand-theme-color, 10%);
			}
		}
	}
</style>