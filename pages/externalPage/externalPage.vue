<script setup>
const props = defineProps({
	pageUrl: String
});

const wbStyles = {
	width: "100%",
	height: "100%"
};
</script>

<template>
	<view class="box">
		<view class="title">桂电助手</view>
		<view class="card">
			<view>
				<view class="warn">
					<image class="icon" src="../../static/icon/externalPage/warn.svg" />
					<view>请注意您的账号和财产安全</view>
				</view>
				<view class="tip">
					<text>
						您即将离开桂电助手，去往：
						<text class="url">{{ pageUrl }}</text>
					</text>
				</view>
			</view>
			<view class="link-view">
				<uni-link class="link" :href="pageUrl" color="#174E8E" :showUnderLine="false">继续</uni-link>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
.box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.title {
	margin-bottom: 50rpx;
	font-weight: bold;
	font-size: 50rpx;
	color: $brand-theme-color;
}

.card {
	width: 80%;
	background-color: $bg-color-white;
	padding: 50rpx;
	border-radius: 20rpx;

	.warn {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		background-color: lighten($brand-theme-color, 50%);
		font-weight: bold;
		border-radius: 19rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;

		.icon {
			height: 35rpx;
			width: 35rpx;
			margin-right: 15rpx;
		}
	}

	.tip {
		line-height: 50rpx;

		.url {
			color: $brand-theme-color;
		}
	}

	.link-view {
		display: flex;
		justify-content: flex-end;
		margin-top: 20rpx;

		.link {
			width: 150rpx;
			height: 70rpx;
			background-color: $bg-color-white;
			border-radius: 999rpx;
			border: 1px solid $brand-theme-color;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
