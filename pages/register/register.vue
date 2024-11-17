<template>
	<view class="registerPage">
		<image class="background-image" src="/static/background/loginbg.png" mode="aspectFill"></image>
		<view class="back" :style="{ top: buttonInfo.top + 'px', left: buttonInfo.left + 'px' }" @click="goTologin">
			<image class="backimg" src="../../static/icon/login/back.svg"></image>
			<text class="backword">返回登录</text>
		</view>

		<view class="title">注册</view>

		<form class="registerBox">
			<view class="input-group">
				<text class="label">用户名</text>
				<input class="input" v-model="username" placeholder="请输入用户名" />
			</view>
			<view class="input-group">
				<text class="label">密码</text>
				<input class="input" v-model="password" type="password" placeholder="请输入密码" />
			</view>
			<view class="input-group">
				<text class="label">确认密码</text>
				<input class="input" v-model="confirmPassword" type="password" placeholder="请确认密码" />
			</view>

			<view class="icon-group" style="margin-bottom: 15rpx">
				<text class="label">身份</text>
				<radio-group class="icon-group" @change="handleIdentitychange">
					<view class="option">
						<image class="icon" src="/static/icon/login/student.svg"></image>
						<radio class="radio" value="学生" color="#174E8E" />
						学生
					</view>
					<view class="option">
						<image class="icon" src="/static/icon/login/teacher.svg"></image>
						<radio class="radio" value="教师" color="#174E8E" />
						教师
					</view>
				</radio-group>
			</view>

			<view class="input-group">
				<text class="label">学号/工号</text>
				<input class="input" v-model="studentId" placeholder="请输入学号/工号" />
			</view>

			<view class="dropdown">
				<text class="label">学院</text>
				<view class="dropdown-label" @click="toggleDropdown">
					{{ selectedOption || "请选择学院" }}
					<text class="arrow">{{ showDropdown ? "▲" : "▼" }}</text>
				</view>
				<scroll-view v-show="showDropdown" class="dropdown-options" scroll-y style="max-height: 120px">
					<view
						v-for="(option, index) in options"
						:key="index"
						class="dropdown-option"
						@click="selectOption(option)"
					>
						{{ option }}
					</view>
				</scroll-view>
			</view>

			<button class="register-buttom" @click="register">验证</button>
		</form>
	</view>
</template>

<script>
import { ref } from "vue";
import { getNavBarHeight } from "@/utils/system.js";
import { userRegister } from "../../api/user.js";
const buttonInfo = ref({
	top: getNavBarHeight(),
	left: 20
});

export default {
	data() {
		return {
			buttonInfo,
			username: "",
			password: "",
			confirmPassword: "",
			studentId: "",
			type: "student", // 默认选择学生
			selectedOption: "",
			selectedIdentity: "student",
			showDropdown: false,
			selectedOption: "",
			options: [
				"信息与通信学院",
				"机电工程学院",
				"计算机与信息安全学院",
				"艺术与设计学院",
				"商学院",
				"外国语学院",
				"数学与计算科学学院",
				"电子工程与自动化学院",
				"法学院",
				"材料科学与工程学院",
				"生命与环境科学学院",
				"马克思主义学院",
				"应用科技学院",
				"国际学院",
				"公共事务学院",
				"信息科技学院",
				"北海职业技术学院（北海）"
			]
		};
	},
	methods: {
		handleIdentitychange(event) {
			this.type = event.detail.value;
			console.log("选择的身份:", this.type);
		},
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		},
		selectOption(option) {
			this.selectedOption = option;
			this.showDropdown = false;
		},
		goTologin() {
			uni.redirectTo({
				url: "/pages/login/login"
			});
		},
		async register() {
			// 验证表单内容是否完整
			if (
				!this.username ||
				!this.password ||
				!this.confirmPassword ||
				!this.studentId ||
				!this.selectedOption ||
				!this.type
			) {
				uni.showToast({
					title: "请填写所有信息",
					icon: "none"
				});
				return;
			}
			// 检查两次输入的密码是否一致
			if (this.password !== this.confirmPassword) {
				uni.showToast({
					title: "两次输入的密码不一致",
					icon: "none"
				});
				return;
			}
			try {
				// 发起注册请求
				const response = await userRegister({
					username: this.username,
					type: this.type,
					password: this.password,
					college: this.selectedOption, // 根据选择的学院
					studentId: this.studentId
				});
				if (response.code === 200) {
					uni.showToast({
						title: "注册成功！两秒后返回登陆界面，如未响应请手动点击左上角返回按钮。",
						icon: "none"
					});
					// 跳转到登录页或其他页面
					setTimeout(() => {
						this.goTologin();
					}, 2000);
				} else {
					uni.showToast({ title: response.msg || "注册失败，请重试", icon: "none" });
				}
			} catch (error) {
				uni.showToast({ title: error.message || "注册失败，请重试", icon: "none" });
			}
		}
	}
};
</script>

<style lang="scss">
.registerPage {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
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

.back {
	position: fixed;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.backimg {
	width: 50rpx;
	height: 50rpx;
}
.backword {
	margin-left: 10rpx;
	color: $brand-theme-color;
	font-size: 28rpx;
	font-weight: bold;
}

.title {
	width: 80%;
	font-weight: bolder;
	color: $brand-theme-color;
	font-size: 64rpx;
	margin-bottom: 50rpx;
}

.registerBox {
	width: 80%;
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 0.8);
	padding: 20rpx;
	border-radius: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	margin-bottom: 40rpx;
}

.input-group {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 15rpx;
}

.label {
	font-size: 28rpx;
	width: 125rpx;
	margin: 0 10rpx 0 10rpx;
}

.input {
	width: 70%;
	border: none;
	border-bottom: 1rpx solid $border-color;
	padding: 10rpx;
	margin: 0 10rpx 0 25rpx;
	font-size: 28rpx;
}

.icon-group {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.option {
	display: flex;
	align-items: center;
	margin-left: 24rpx;
}

.icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 8rpx;
}

.radio {
	transform: scale(0.75);
	margin-right: 8rpx;
}

.dropdown {
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	font-size: 28rpx;
	margin-bottom: 15rpx;
}

.dropdown-label {
	padding: 12rpx;
	margin-left: 24rpx;
	height: 8%;
	width: 70%;
	background-color: $bg-color-grey;
	border: 1px solid $border-color;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
}

.arrow {
	font-size: 28rpx;
	color: black;
}

.dropdown-options {
	position: absolute;
	top: 100%;
	width: 100%;
	background-color: white;
	border: 1px solid $border-color;
	border-radius: 4px;
	z-index: 10;
	overflow-y: auto;
}

.dropdown-option {
	padding: 20rpx;
	border-bottom: 1px solid $border-color;
	cursor: pointer;
}

.dropdown-option:last-child {
	border-bottom: none;
}

.dropdown-option:hover {
	background-color: $bg-color-grey;
}

.register-buttom {
	width: 80%;
	background-color: $brand-theme-color;
	color: white;
	text-align: center;
	border-radius: 20rpx;
	font-size: 32rpx;
	font-weight: bold;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}
</style>
