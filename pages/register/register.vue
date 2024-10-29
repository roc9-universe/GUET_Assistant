<template>
	<view class="registerPage">
		<image class="background-image" src="/static/background/loginbg.png" mode="aspectFill"></image>
		<view class="title">注册</view>
		<view class="registerBox">
			<view class="input-group">
				<text class="label">用户名</text>
				<input class="input" placeholder="请输入用户名" />
			</view>
			<view class="input-group">
				<text class="label">密码</text>
				<input class="input" placeholder="请输入密码" />
			</view>
			<view class="input-group">
				<text class="label">确认密码</text>
				<input class="input" placeholder="请确认密码" />
			</view>
			
			<view class="icon-group" style="margin-bottom: 15rpx;">
				<text class="label">身份</text>
				<radio-group class="icon-group" @change="handleIdentitychange">
				    <view class="option">
						<image class="icon" src="/static/icon/login/student.svg"></image>
				        <radio class="radio" value="student" color="#174E8E" />学生
			        </view>
	                <view class="option">
		                <image class="icon" src="/static/icon/login/teacher.svg"></image>
			            <radio class="radio" value="teacher" color="#174E8E" />老师
				    </view>
				</radio-group>
			</view>
			
			<view class="input-group">
				<text class="label">学号</text>
				<input class="input" placeholder="请输入学号" />
			</view>
			
			<view class="dropdown">
				<text class="label">学院</text>
			    <view class="dropdown-label" @click="toggleDropdown">
			        {{ selectedOption || '请选择学院' }}
			        <text class="arrow">{{ showDropdown ? '▲' : '▼' }}</text>
			    </view>
			    <scroll-view
			        v-show="showDropdown"
			        class="dropdown-options"
			        scroll-y
			        style="max-height: 120px;"
			    >
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
			
			<button class="register-buttom" @click="goTologin">验证</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedIdentity: "student",
				
				showDropdown: false,
				selectedOption: '',
				options: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8'] // 示例选项
			}
		},
		methods: {
			handleIdentitychange(event) {
			    this.selectedIdentity = event.detail.value;
			    console.log("选择的身份:", this.selectedIdentity);
			},
			toggleDropdown() {
			    this.showDropdown = !this.showDropdown;
			},
			selectOption(option) {
			    this.selectedOption = option;
			    this.showDropdown = false;
			},
			goTologin(){
				uni.redirectTo({
					url:"/pages/login/login"
				})
			},
		}
	}
</script>

<style>
	.registerPage{
		display: flex;  flex-direction: column;
		align-items: center; justify-content: center;
		width: 100vw; height: 100vh;
		/*background-color: #f8f8f8;
		background-image: url("~@/static/loginbg.png");
		background-size: 100% 100%;*/
	}
	.background-image {
	    position: absolute;
	    width: 100%; height: 100%;
	    top: 0; left: 0;
	    z-index: -1;
	}
	.title{
		width: 80%; font-weight: bolder;
		color: #174E8E; font-size: 64rpx;
		margin-bottom: 50rpx;
	}
	
	.registerBox{
		width: 80%;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 40rpx;
	}
	.input-group {
		display: flex;  flex-direction: row;
		align-items: center; 
		margin-bottom: 15rpx;
	}
	.label{
		font-size: 28rpx; width: 20%;
		margin:0 10rpx 0 10rpx;
	}
	.input{
		width: 70%; border: none;
		border-bottom: 1rpx solid #ccc;
		padding: 10rpx;
		margin: 0 10rpx 0 25rpx;
		font-size: 28rpx;
	}
	
	.icon-group{
		display: flex;  flex-direction: row;
		align-items: center;
	}
	.option{
	    display: flex;
	    align-items: center;
		margin-left: 24rpx;
	}
	.icon{
		width: 36rpx; height: 36rpx;
		margin-right: 8rpx;
	}
	.radio{
	    transform: scale(0.75);
	    margin-right: 8rpx;
	}
	
	.dropdown {
	    display: flex; flex-direction: row;
	    align-items: center; position: relative;
	    font-size: 28rpx; margin-bottom: 15rpx;
	}
	.dropdown-label {
	    padding: 12rpx; margin-left: 24rpx;
		height: 8%; width: 70%;
	    background-color: #f8f8f8;
	    border: 1px solid #ccc;
	    border-radius: 4px;
	    display: flex; justify-content: space-between;
	    align-items: center; cursor: pointer; 
	}
	.arrow {
	    font-size: 28rpx;
	    color: #666;
	}
	.dropdown-options {
	    position: absolute;
	    top: 100%;
	    width: 100%;
	    background-color: white;
	    border: 1px solid #ccc;
	    border-radius: 4px;
	    z-index: 10;
	    overflow-y: auto;
	}
	.dropdown-option {
	    padding: 20rpx;
	    border-bottom: 1px solid #eee;
	    cursor: pointer;
	}
	.dropdown-option:last-child {
	    border-bottom: none;
	}
	.dropdown-option:hover {
	    background-color: #f0f0f0;
	}
	
	.register-buttom{
		width: 80%;
		background-color: #174E8E;
		color: white; text-align: center;
		border-radius: 50rpx;
		font-size: 32rpx; font-weight: bold;
		margin-top: 30rpx; margin-bottom: 30rpx;
	}
</style>
