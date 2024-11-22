<template>
	<view class="box">
		<!--头像-->
		<view class="info">
			<view class="profile">
				<image class="avatar" :src="avatar" />
				<view class="details">
					<text class="name">{{ username }}</text>
					<text class="student-id">
						{{ type === "学生" ? "学号" : "工号" }} {{ studentId ? studentId : "请绑定账号" }}
					</text>
				</view>
				<button class="edit-btn" @click="editInfo">编辑资料</button>
			</view>

			<view class="identity">
				<text class="school">桂林电子科技大学</text>
				<image class="icon" src="../../static/icon/mine/school.svg"></image>
			</view>
			<text class="specific">学院{{ isAdmin ? "管理员" : type }}</text>
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
		</view>

		<!--工具-->
		<view class="main">
			<view class="menu-item" @click="goTotool">
				<image class="icon" src="../../static/icon/mine/tool.svg" />
				<text>常用工具</text>
			</view>
			<view class="menu-item" @click="goToabout">
				<image class="icon" src="../../static/icon/mine/about.svg" />
				<text>关于我们</text>
			</view>
		</view>

		<!--设置 -->
		<view class="main">
			<view class="menu-item" @click="editInfo">
				<image class="icon" src="../../static/icon/mine/setting.svg" />
				<text>设置</text>
			</view>
			<view v-if="!wxId" class="menu-item" @click="bindWeChat">
				<image class="icon" src="../../static/icon/mine/wx.svg" />
				<text>绑定微信</text>
			</view>
			<view v-if="!studentId" class="menu-item" @click="bindAccount">
				<image class="icon" src="../../static/icon/mine/zh.svg" />
				<text>绑定账号</text>
			</view>
			<view class="menu-item" style="border-bottom: 0" @click="exitLogin">
				<image class="icon" src="../../static/icon/mine/exit.svg" />
				<text>退出登录</text>
			</view>
		</view>

		<view>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog
					mode="input"
					title="绑定账号"
					@close="confirmBindingClose()"
					@confirm="confirmBindingAccount()"
				>
					<view style="width: 100%">
						<view>
							<uni-easyinput v-model="inputData.studentId" focus placeholder="请填写工号/学号" />
						</view>
						<view style="margin-top: 20rpx">
							<uni-easyinput v-model="inputData.password" type="password" placeholder="请填写密码" />
						</view>
					</view>
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import { getUserInfo, binding } from "../../api/user.js";

export default {
	data() {
		return {
			id: "",
			avatar: "",
			username: "",
			studentId: "",
			wxId: "",
			type: "",
			isAdmin: false,
			inputData: {
				studentId: "",
				password: ""
			}
		};
	},
	onShow() {
		this.initialData();
	},
	methods: {
		initialData() {
			// 从 storage 中获取用户信息
			const userInfo = uni.getStorageSync("userInfo");
			if (userInfo) {
				// 用户名和学号
				this.id = userInfo.id || "";
				this.username = userInfo.username || "未绑定";
				this.studentId = userInfo.studentId || "";
				this.wxId = userInfo.wxId || "";
				this.avatar = userInfo.avatar || "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
				this.type = userInfo.type || "未绑定身份";

				//console.log("name:",this.username);
				if (userInfo.type === "admin") {
					this.isAdmin = true;
				} else {
					this.isAdmin = false;
				}
			}
		},
		editInfo() {
			uni.navigateTo({
				url: "/pages/setting/setting"
			});
		},
		goTopublish() {
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
		bindWeChat() {
			uni.showLoading({
				title: "绑定中",
				mask: true
			});
			wx.login({
				success: async (res) => {
					try {
						await binding({ code: res.code });
						await getUserInfo(this.id);
						this.initialData();
						uni.showToast({
							title: "绑定成功",
							icon: "success"
						});
					} catch {
						uni.showToast({
							title: "绑定失败",
							icon: "error"
						});
					} finally {
						uni.hideLoading();
					}
				}
			});
		},
		bindAccount() {
			this.$refs.inputDialog.open();
		},
		async confirmBindingAccount() {
			if (this.inputData.password === "" || this.inputData.studentId === "") {
				uni.showToast({
					title: "请同时输入账号和密码",
					icon: "none"
				});
				return;
			}
			uni.showLoading({
				title: "绑定中",
				mask: true
			});
			try {
				await binding(this.inputData);
				await getUserInfo(this.id);
				this.initialData();
				uni.showToast({
					title: "绑定成功",
					icon: "success"
				});
				this.inputData = {
					studentId: "",
					password: ""
				};
			} catch {
				uni.showToast({
					title: "绑定失败",
					icon: "error"
				});
			} finally {
				uni.hideLoading();
			}
		},
		confirmBindingClose() {
			this.inputData = {
				studentId: "",
				password: ""
			};
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
	padding: 0 20rpx;
	margin-top: 30rpx;
	margin-bottom: 20rpx;
	background-color: white;

	.menu-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid $text-font-color-5;
	}
}

.icon {
	width: 50rpx;
	height: 50rpx;
	margin-right: 20rpx;
}
</style>
