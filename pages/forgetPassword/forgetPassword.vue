<template>
	<view class="forgetPage">
		<button class="register-buttom" @click="goTologin">点击返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goTologin(){
				uni.redirectTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style>
	.forgetPage{
		display: flex;  flex-direction: column;
		align-items: center; justify-content: center;
		width: 100vw; height: 100vh;
		/*background-color: #f8f8f8;
		background-image: url("~@/static/loginbg.png");
		background-size: 100% 100%;*/
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
