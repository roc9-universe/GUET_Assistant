<template>
	<view class="loginPage">
		<image class="background-image" src="/static/background/loginbg.png" mode="aspectFill"></image>
		<view class="title">登录</view>
		<form class="form">
			<view class="loginBox">
				<view class="input-group">
					<text class="label">学号/工号</text>
					<input class="input" v-model="studentId" placeholder="请输入学号/工号" required />
				</view>
				<view class="input-group">
					<text class="label">密码</text>
					<input class="input" v-model="password" placeholder="请输入密码" type="password" required />
				</view>
			</view>
			<button class="login-button" type="button" @click="goToquestion">登录</button>
		</form>
		<view class="register">
			<text class="register-option" @click="goToregister">账号注册</text>
			<text class="register-option" @click="goToforget">忘记密码</text>
		</view>

		<view class="social-login">
			<text style="color: #f8f8f8">———— 其他方式 ————</text>
			<view class="iconGroup">
				<image class="icon" @click="loginWithwechat" src="/static/icon/login/wechat.svg" />
				<image class="icon" @click="loginWithQQ" src="/static/icon/login/QQ.svg" />
			</view>
		</view>
	</view>
</template>

<script>
import { userLogin, getUserInfo, loginWithWechat } from "../../api/user.js";
export default {
	data() {
		return {
			studentId: null,
			password: null
		};
	},
	methods: {
		async goToquestion() {
			try {
				if (!this.studentId || !this.password) {
					uni.showToast({
						title: "请填写所有信息",
						icon: "none"
					});
				} else {
					const response = await userLogin(this.studentId, this.password);
					if (response.code === 200) {
						console.log("登录成功");
						// 获取用户 ID
						const userId = uni.getStorageSync("userInfo").id;
						// 调用 getUserInfo 获取用户信息
						const userInfo = await getUserInfo(userId);
						uni.showModal({
							title: "登录成功",
							content: "您已登录成功！",
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									// 用户点击“确定”后跳转页面
									uni.switchTab({
										url: "/pages/qa/qa"
									});
								}
							}
						});
					} else {
						// 显示错误消息
						uni.showToast({ title: response.msg || "登录失败，请重试", icon: "none" });
					}
				}
			} catch (error) {
				console.error("登录失败:", error);
				uni.showToast({ title: error.msg || "登录失败，请重试", icon: "none" });
			}
		},
		goToregister() {
			uni.navigateTo({
				url: "/pages/register/register"
			});
		},
		goToforget() {
			uni.navigateTo({
				url: "/pages/forgetPassword/forgetPassword"
			});
		},
		loginWithwechat() {
			// 微信登录
			wx.login({
				success: async (res) => {
					if (res.code) {
						try {
							// 调用 loginWithWechat 进行微信登录
							const loginResponse = await loginWithWechat(res.code);
							// 微信登录成功
							if (loginResponse.code === 200) {
								const { token, id } = loginResponse.data;
								// 获取用户 ID
								const userId = uni.getStorageSync("userInfo").id;
								// 调用 getUserInfo 获取用户信息
								const userInfo = await getUserInfo(userId);
								uni.showModal({
									title: "登录成功",
									content: "您已登录成功！",
									showCancel: false,
									success: (res) => {
										if (res.confirm) {
											// 用户点击“确定”后跳转页面
											uni.switchTab({
												url: "/pages/qa/qa"
											});
										}
									}
								});
							} else {
								uni.showToast({
									title: loginResponse.data.msg || "登录失败",
									icon: "none"
								});
							}
						} catch (error) {
							uni.showToast({
								title: error.message || "网络错误，请重试",
								icon: "none"
							});
						}
					} else {
						uni.showToast({
							title: "微信登录失败，请重试",
							icon: "none"
						});
					}
				},
				fail: (err) => {
					console.error("微信登录失败", err);
					uni.showToast({
						title: "微信登录失败，请重试",
						icon: "none"
					});
				}
			});
		},
		loginWithQQ() {
			uni.showToast({
				title: "抱歉，QQ登录暂不可用，请使用其他方式登录。",
				icon: "none"
			});
		}
	}
};
</script>

<style lang="scss">
.loginPage {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
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
	color: $brand-theme-color;
	font-size: 64rpx;
	margin-bottom: 50rpx;
}

.form {
	width: 80%;
}

.loginBox {
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 0.8);
	padding: 20rpx;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	margin-bottom: 40rpx;

	.input-group {
		margin: 15rpx 0 30rpx 0;
		align-items: center;
		justify-content: center;
	}

	.label {
		width: 30%;
		font-size: 28rpx;
		margin: 0 10rpx 0 10rpx;
		display: block;
	}

	.input {
		width: 95%;
		border: none;
		border-bottom: 1rpx solid $border-color;
		padding: 10rpx 0;
		margin: 0 10rpx 0 10rpx;
		font-size: 28rpx;
	}
}

.login-button {
	width: 80%;
	background-color: $brand-theme-color;
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

	.register-option {
		color: #f8f8f8;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
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

	.icon {
		width: 80rpx;
		height: 80rpx;
		margin-top: 20rpx;
		border-radius: 50rpx;
	}
}
</style>
