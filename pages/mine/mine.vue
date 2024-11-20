<template>
	<view class="mine">
		<!--头像-->
		<view class="info">
			<view class="profile">
				<image class="avatar" src="../../static/icon/mine/avatar.jpg" />
				<view class="details">
					<text class="name">{{ username }}</text>
					<text class="student-id">学号/工号: {{ studentId }}</text>
				</view>
				<button class="edit-btn" @click="editInfo">编辑资料</button>
			</view>

			<view class="identity">
				<text class="school">桂林电子科技大学</text>
				<image class="icon" src="../../static/icon/mine/school.svg"></image>
			</view>
			<text class="specific">学院{{ type }}</text>
		</view>

		<!--功能-->
		<view class="main">
			<view class="menu-item" v-if="isAdmin" @click="goTopublish">
				<image class="icon" src="../../static/icon/mine/publish.svg" />
				<text>发布信息</text>
			</view>
			<view class="menu-item" @click="goTomap">
				<image class="icon" src="../../static/icon/mine/map.svg" />
				<text>校内地图</text>
			</view>
			<view class="menu-item" @click="goToweather">
				<image class="icon" src="../../static/icon/mine/weather.svg" />
				<text>今日天气</text>
			</view>
			<view class="menu-item" @click="goTotool">
				<image class="icon" src="../../static/icon/mine/tool.svg" />
				<text>常用工具</text>
			</view>
			<view class="menu-item" @click="goToabout">
				<image class="icon" src="../../static/icon/mine/about.svg" />
				<text>关于我们</text>
			</view>
			<view class="menu-item" @click="editInfo">
				<image class="icon" src="../../static/icon/mine/setting.svg" />
				<text>设置</text>
			</view>
			<view class="menu-item" @click="exitLogin">
				<image class="icon" src="../../static/icon/mine/exit.svg" />
				<text>退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			studentId: "",
			type: "",
			isAdmin: false
		};
	},
	onShow() {
		// 从 storage 中获取用户信息
		const userInfo = uni.getStorageSync("userInfo");
		if (userInfo) {
			// 用户名和学号
			this.username = userInfo.username || "未绑定";
			this.studentId = userInfo.studentId || "请前往编辑资料绑定";
			this.type = userInfo.type || "未绑定身份";
			//console.log("name:",this.username);
			if (userInfo.type === "admin") {
				this.isAdmin = true;
			} else {
				this.isAdmin = false;
			}
		}
	},
	methods: {
		editInfo() {
			//你好
			uni.navigateTo({
				url: "/pages/setting/setting"
			});
		},
		goTopublish(){
			uni.navigateTo({
				url: "/pages/publish/publish"
			});
		},
		goTomap() {
			uni.navigateTo({
				url: "/pages/map/map"
			});
		},
		goToweather() {
			console.log("跳转天气");
			uni.navigateTo({
				url: "/pages/weather/weather"
			});
		},
		goTotool() {
			console.log("跳转工具");
			uni.navigateTo({
				url: "/pages/tool/tool"
			});
		},
		goToabout() {
			uni.navigateTo({
				url: "/pages/about/about"
			});
		},
		exitLogin() {
			uni.clearStorageSync("userInfo");
			uni.redirectTo({
				url: "/pages/login/login"
			});
		}
	}
};
</script>

<style lang="scss">
.mine {
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: calc(100vh - env(safe-area-inset-bottom));
	background-color: $bg-color-grey;
}

.info {
	background-color: $brand-theme-color;
	padding: 20rpx;
	border-radius: 0 0 10px 10px;
	height: 320rpx;
	width: 100vw;

	.profile {
		display: flex;
		flex-direction: row;
		align-items: center;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			margin: 20rpx;
			border-radius: 5px;
		}

		.details {
			display: flex;
			flex-flow: column;
		}

		.name {
			font-size: 42rpx;
			font-weight: bold;
			color: white;
			margin-bottom: 10rpx;
		}

		.student-id {
			font-size: 24rpx;
			color: #eaeaea;
		}

		.edit-btn {
			background-color: white;
			color: $brand-theme-color;
			font-size: 24rpx;
			border-radius: 10rpx;
			align-items: center;
			justify-content: center;
			margin-right: 15rpx;
			height: 60rpx;
			width: 170rpx;
		}
	}
	.identity {
		display: flex;
		align-items: center;
		margin-left: 20rpx;
		margin-top: 20rpx;

		.school {
			font-size: 32rpx;
			color: white;
			margin-bottom: 10rpx;
			margin-right: 10rpx;
		}
	}

	.specific {
		font-size: 24rpx;
		color: $bg-color-grey;
		margin-left: 20rpx;
		margin-top: 10rpx;
	}
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

.icon {
	width: 50rpx;
	height: 50rpx;
	margin-right: 20rpx;
}
</style>
