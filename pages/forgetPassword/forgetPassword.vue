<template>
	<view class="forgetPage">
		<image class="background-image" src="/static/background/loginbg.png" mode="aspectFill"></image>
		<view class="back" :style="{ top: buttonInfo.top + 'px', left: buttonInfo.left +'px' }" @click="goTologin">
			<image class="backimg" src="../../static/icon/login/back.svg" ></image>
			<text class="backword" >返回登录</text>
		</view>
		<view class="title">找回密码</view>
		<form class="forgetBox">
			
		
		<button class="register-buttom" @click="forgetPassword">找回密码</button>
		</form>
	</view>
</template>

<script>
import { ref } from "vue";
import { getNavBarHeight } from "@/utils/system.js";
const buttonInfo = ref({
		top: getNavBarHeight(),
		left: 20
	});
	
	export default {
		data() {
			return {
				buttonInfo,
			}
		},
		methods: {
			goTologin() {
				uni.redirectTo({
					url: "/pages/login/login"
				})
			},
			forgetPassword(){
				uni.redirectTo({
					url: "/pages/login/login"
				})
			}
		}
	}
</script>

<style lang="scss">
	.forgetPage {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		/*background-color: #f8f8f8;
		background-image: url("~@/static/loginbg.png");
		background-size: 100% 100%;*/
	}

	.background-image {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}
	
	.back{
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;	
	}
	.backimg{
		width: 50rpx;
		height: 50rpx;
	}
	.backword{
		margin-left: 10rpx;
		color: $brand-theme-color;
		font-size: 28rpx;
		font-weight: bold;
	}
	
	.title {
		width: 80%;
		font-weight: bolder;
		color: $brand-theme-color;
		;
		font-size: 64rpx;
		margin-bottom: 50rpx;
	}

	.forgetBox{
		width: 80%;
		backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.8);
		padding: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 40rpx;
	}

	.register-buttom {
		width: 80%;
		background-color: $brand-theme-color;
		color: white;
		text-align: center;
		border-radius: 50rpx;
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
</style>