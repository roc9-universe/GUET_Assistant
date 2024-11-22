<template>
	<view class="enter">
		<button
			class="skip"
			@click="handleSkip"
			:style="{
				top: buttonInfo.top + 'px',
				right: buttonInfo.right + 'px'
			}"
		>
			跳过
		</button>
		<view class="body">
			<view class="midWord">
				<text class="midChinese">桂电助手</text>
				<text class="midPingyin">GUI DIAN ZHU SHOU</text>
			</view>

			<view class="bottom">
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
import { getNavBarHeight } from "@/utils/system.js";
import { ref } from "vue";
import { getUserInfo } from "../../api/user.js";
import { onShow } from "@dcloudio/uni-app";

const buttonInfo = ref({
	top: getNavBarHeight(),
	right: 20
});

const skipRequested = ref(false);

onShow(async () => {
	const startTime = Date.now(); // 记录开始时间
	// 获取本地存储中的 userInfo
	const userInfo = uni.getStorageSync("userInfo");
	console.log("本地存储的 userInfo:", userInfo);

	// 定义跳转到登录页的函数
	const redirectToLogin = () => {
		uni.redirectTo({
			url: "/pages/login/login"
		});
	};

	// 检查 userInfo 和 token
	if (!userInfo || !userInfo.token) {
		console.log("userInfo 或 token 不存在");

		// 如果没有 userInfo 或 token，设置 2 秒后跳转
		const elapsedTime = Date.now() - startTime;
		if (elapsedTime < 2000) {
			// 如果时间小于 2 秒，等待剩余的时间
			setTimeout(() => {
				redirectToLogin(); // 跳转到登录
			}, 2000 - elapsedTime);
		} else {
			// 如果时间超过 2 秒，立即跳转
			redirectToLogin();
		}
		return;
	}

	// 定义跳转函数
	const redirectToQa = () => {
		uni.switchTab({
			url: "/pages/qa/qa"
		});
	};

	//定义请求获取用户信息
	const executeRequest = async () => {
		try {
			const data = await getUserInfo(userInfo.id);
			const elapsedTime = Date.now() - startTime; // 计算请求时间
			if (elapsedTime < 2000) {
				// 如果时间小于 2 秒，等待剩余的时间
				setTimeout(() => {
					redirectToQa(); // 跳转到问答
				}, 2000 - elapsedTime);
			} else {
				// 如果时间超过 2 秒，立即跳转
				redirectToQa();
			}
		} catch (error) {
			console.error("获取用户信息失败:", error);
			const elapsedTime = Date.now() - startTime; // 计算请求时间
			if (elapsedTime < 2000) {
				// 如果时间小于 2 秒，等待剩余的时间
				setTimeout(() => {
					redirectToLogin(); // 跳转到登录
				}, 2000 - elapsedTime);
			} else {
				// 如果时间超过 2 秒，立即跳转
				redirectToLogin();
			}
		}
	};

	// 点击跳过按钮
	const handleSkip = () => {
		skipRequested.value = true; // 标记为跳过
		// 检查 userInfo 和 token
		if (!userInfo || !userInfo.token) {
			redirectToLogin();
			return;
		} else {
			executeRequest(); // 立即请求用户信息
		}
	};

	// 没有点击跳过按钮
	if (!skipRequested.value) {
		executeRequest(); // 执行请求
	}
});
</script>

<style lang="scss">
.enter {
	width: 100vw;
	height: 100vh;
	background-color: $bg-color-grey;
	overflow: hidden;
	position: relative;
}

.skip {
	background-color: $brand-theme-color;
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

	.midWord {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 20vh;

		.midChinese {
			font-size: 64rpx;
			color: $brand-theme-color;
			font-weight: bold;
		}

		.midPingyin {
			font-size: 24rpx;
			color: $brand-theme-color;
			margin-top: 10rpx;
		}
	}

	.bottom {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 15vh;

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
	}
}
</style>
