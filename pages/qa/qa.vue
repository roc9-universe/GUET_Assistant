<script setup>
	const data =
		"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你"
</script>

<template>
	<view class="box qa-box">
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

<style scoped lang="scss">
	.qa-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: $bg-color-grey;

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
				min-width: 140rpx;
				margin-left: 15rpx;
				padding: 4rpx 0;
				background-color: $brand-theme-color;
				color: white;
			}

			.is-hover {
				background-color: darken($brand-theme-color, 10%);
			}
		}
	}
</style>