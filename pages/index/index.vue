<template>
	<view class="enter">
		<button class="skip" @click="goTologin" :style="{ 
				top: buttonInfo.top + 'px',
				right: buttonInfo.right + 'px'
				}">
			跳过
		</button>
		<view class="body">
			<view class="midWord">
				<text class="midChinese">桂电助手</text>
				<text class="midPingyin">GUI DIAN ZHU SHOU</text>
			</view>

			<view class="buttom">
				<image src="../../static/icon/enter/zhxy.jpg" class="img"></image>
				<view class="underWord">
					<text class="underChinese">智慧校园</text>
					<text class="underEnglish">CAMPUSHOY</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		getNavBarHeight
	} from "@/utils/system.js";
	import {
		ref
	} from "vue";

	const buttonInfo = ref({
		top: getNavBarHeight(),
		right: 20
	});
	const timer = ref(null);

	const goTologin = () => {
		uni.redirectTo({
			url: "/pages/login/login"
		})
		clearTimeout(timer.value);
	};

	timer.value = setTimeout(()=>{
		uni.redirectTo({
			url:'/pages/login/login'
		});
	},2000);
</script>

<style>
	.enter {
		width: 100vw;
		height: 100vh;
		background-color: #f8f8f8;
		overflow: hidden;
		position: relative;
	}

	.skip {
		background-color: #174E8E;
		color: white;
		width: 120rpx;
		font-size: 24rpx;
		position: absolute;

	}

	.body {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.midWord {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 20vh;
	}

	.midChinese {
		font-size: 64rpx;
		color: #174E8E;
		font-weight: bold;
	}

	.midPingyin {
		font-size: 24rpx;
		color: #174E8E;
		margin-top: 10rpx;
	}

	.buttom {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 15vh;
	}

	.img {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10px;
	}

	.underWord {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 50rpx;
	}

	.underChinese {
		font-size: 64rpx;
		font-style: italic;
		text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
	}

	.underEnglish {
		font-size: 32rpx;
		margin-top: 10rpx;
		letter-spacing: 5rpx;
	}
</style>