<template>
	<view class="aboutPage">
		<view class="main">
			<view class="menu-item">
				<text>不知道</text>
			</view>
			<view class="menu-item">
				<text>写什么</text>
			</view>
			<view class="menu-item">
				<text>先这样</text>
			</view>
			<view class="menu-item">
				<text>放着吧</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.aboutPage{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		background-color: $bg-color-grey;
	}
	
	.main {
		padding: 10rpx 20rpx 20rpx 20rpx;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		background-color: white;
	
		.menu-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;
			border-bottom: 1px solid $border-color;
		}
	}
</style>
