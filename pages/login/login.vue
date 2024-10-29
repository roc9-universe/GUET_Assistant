<template>
	<view class="loginPage">
		<image class="background-image" src="/static/background/loginbg.png" mode="aspectFill"></image>
		<view class="title">登录</view>
		<view class="loginBox">
			<view class="input-group">
				<text class="label">学号</text>
				<input class="input" placeholder="请输入学号" />
			</view>
			<view class="input-group">
				<text class="label">密码</text>
				<input class="input" placeholder="请输入密码" password="true" />
			</view>
		</view>
		<button class="login-button" @click="goToquestion">登录</button>
		<view class="register">
			<text class="register-option" @click="goToregister">账号注册</text>
			<text class="register-option" @click="goToforget">忘记密码</text>
		</view>

		<view class="social-login">
			<text style="color: #f8f8f8;">———— 其他方式 ————</text>
			<view class="iconGroup">
				<image class="icon" src="/static/icon/login/wechat.svg" />
				<image class="icon" src="/static/icon/login/QQ.svg" />
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
			goToquestion() {
				uni.switchTab({
					url: "/pages/chat/chat"
				})
			},
			goToregister() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},
			goToforget() {
				uni.navigateTo({
					url: "/pages/forgetPassword/forgetPassword"
				})
			}
		}
	}
</script>

<style>
	.loginPage {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		/*background-image: url("@/static/loginbg.png");
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

	.title {
		width: 80%;
		font-weight: bolder;
		color: #174E8E;
		font-size: 64rpx;
		margin-bottom: 50rpx;
	}

	.loginBox {
		width: 80%;
		backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.8);
		padding: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 40rpx;
	}

	.input-group {
		margin: 15rpx 0 30rpx 0;
		align-items: center;
		justify-content: center;
	}

	.label {
		width: 15%;
		font-size: 28rpx;
		margin: 0 10rpx 0 10rpx;
		display: block;
	}

	.input {
		width: 95%;
		border: none;
		border-bottom: 1rpx solid #ccc;
		padding: 10rpx 0;
		margin: 0 10rpx 0 10rpx;
		font-size: 28rpx;
	}

	.login-button {
		width: 80%;
		background-color: #174E8E;
		color: white;
		text-align: center;
		border-radius: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.register {
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin: 20rpx;
	}

	.register-option {
		color: #f8f8f8;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.social-login {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 80%;
		margin: 60rpx 0 30rpx 0;
	}

	.iconGroup {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
	}

	.icon {
		width: 80rpx;
		height: 80rpx;
		margin-top: 20rpx;
		border-radius: 50rpx;
	}
</style>